import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignupComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir al componente LoginComponent por defecto
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
