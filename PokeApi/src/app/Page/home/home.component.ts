import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemons: any[] = [];
  pokemonTypes: any[] = [];
  filteredPokemons: any[] = [];
  selectedType: string = '';
  capturedPokemons: any[] = [];
  searchQuery: string = '';
  paginatedPokemons: any[] = [];
  showCapturedPokemons: boolean = false;


  constructor(private pokemonService: PokemonService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPokemons();
    this.pokemonService.getPokemonTypes().subscribe(response => {
      this.pokemonTypes = response.results;
    });
  }



  loadPokemons(offset: number = 0, limit: number = 150) {
    this.pokemonService.getPokemonList(offset, limit).subscribe(response => {
      this.pokemons = response.results;
      this.pokemons.forEach(pokemon => {
        this.pokemonService.getPokemonDetails(pokemon.url).subscribe(details => {
          pokemon.id = details.id;
          pokemon.image = details.sprites.front_default;
          pokemon.types = details.types.map((t: { type: { name: string } }) => t.type.name);
        });
      });
      this.filteredPokemons = this.pokemons;
      this.applyPagination(0);
    }, error => {
      console.error('Error al cargar los Pokémon:', error);
    });
  }




  filterPokemons() {
    let filteredList = this.pokemons;
    if (this.searchQuery) {
      filteredList = filteredList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    if (this.selectedType) {
      this.pokemonService.getPokemonByType(this.selectedType).subscribe(response => {
        const pokemonOfType = response.pokemon.map((p: any) => p.pokemon.name);
        filteredList = filteredList.filter(pokemon =>
          pokemonOfType.includes(pokemon.name)
        );
        this.filteredPokemons = filteredList;
        this.applyPagination(0);
      }, error => {
        console.error('Error al filtrar por tipo:', error);
      });
    } else {
      this.filteredPokemons = filteredList;
      this.applyPagination(0);
    }
  }



  applyPagination(pageIndex: number) {
    const start = pageIndex * 20;
    const end = start + 20;
    this.paginatedPokemons = this.filteredPokemons.slice(start, end);
    console.log('Pokémon paginados:', this.paginatedPokemons); 
  }

  capturePokemon(pokemon: any) {
    if (!this.capturedPokemons.includes(pokemon)) {
      if (this.capturedPokemons.length < 6) {
        this.capturedPokemons.push(pokemon);
      } else {
        this.snackBar.open('Ya tienes 6 Pokémon capturados. El más antiguo será reemplazado.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.capturedPokemons.shift();
        this.capturedPokemons.push(pokemon);
      }
      this.filteredPokemons = this.filteredPokemons.filter(p => p.name !== pokemon.name);
      this.applyPagination(0);
    }
  }

  releasePokemon(pokemon: any) {
    this.capturedPokemons = this.capturedPokemons.filter(p => p.name !== pokemon.name);
    this.filteredPokemons.push(pokemon);
    this.applyPagination(0);
  }
  
  isPokemonCaptured(pokemon: any): boolean {
    return this.capturedPokemons.includes(pokemon);
  }


}
