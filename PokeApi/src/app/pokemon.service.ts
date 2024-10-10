import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/type/');
  }

  getPokemonByType(type: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/type/${type}`);
  }

  getPokemonDetails(url: string): Observable<any> {
  return this.http.get(url);
}

}
