import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignupComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'new-password/:id', component: NewPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
