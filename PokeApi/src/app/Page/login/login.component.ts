import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;
  private splashShown = false;


  constructor(private fb: FormBuilder, private router: Router){
    this.loginForm = this.fb.group({
      usuario:['',[Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7),Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.initializeApp();
    }
  }

  initializeApp() {
    if (!this.splashShown) {
      this.splashShown = true;
      setTimeout(() => {
        this.router.navigateByUrl('login');
      }, 3000);
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      if (usuario === 'Pokemon' && password === '1234567') {
        alert('Ingreso Exitoso! ' +usuario);
        this.router.navigate(['/home']);
      } 
      else {
        alert('Usuario y/o Password son "Pokemon"');
      }
    }
  } 
}

