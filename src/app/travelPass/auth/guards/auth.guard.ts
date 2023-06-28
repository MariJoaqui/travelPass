import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


// Servicios
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyectar el servicio
  constructor( 
    private authService : AuthService,
    private router      : Router
  ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.authUser();
  
    // Verifica si el usuario está autenticado
    if ( isAuthenticated ) {
      return true;
    } 
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
