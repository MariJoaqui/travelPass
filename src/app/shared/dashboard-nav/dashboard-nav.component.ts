import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Librerías 
import Swal from 'sweetalert2';

// Interfaces
import { NavItems } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {

  navItems : NavItems[] = [
    { item: 'Catálogo', link: '/dashboard' },
    { item: 'Publicar', link: '/dashboard/post' },
    { item: 'Perfiles', link: '/dashboard/profiles' }
  ];

  constructor( private router : Router ) {}

  logout(): void {
    Swal.fire({
      title: '¿Seguro que desea salir?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Salir'
    }).then(( result ) => {
      if ( result.isConfirmed ) {
        localStorage.removeItem('id');
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
