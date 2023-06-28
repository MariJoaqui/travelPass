import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './travelPass/auth/guards/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./travelPass/home/home.module').then( m => m.HomeModule ) },
  { path: 'auth', loadChildren: () => import('./travelPass/auth/auth.module').then( m => m.AuthModule ) },
  { path: 'dashboard', loadChildren: () => import('./travelPass/dashboard/dashboard.module').then( m => m.DashboardModule ), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
