import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Page/login/login.component';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './Page/home/home.component';


const routes: Routes = [
  {path: 'splash', component: SplashComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
