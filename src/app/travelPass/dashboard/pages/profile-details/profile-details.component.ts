import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

// Librerías
import Swal from 'sweetalert2';

// Servicios
import { SharedService } from 'src/app/shared/services/shared.service';

// Interfaces
import { User } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {

  showButtons : boolean = false;
  state!      : any;
  user!       : User;

  constructor ( 
    private activateRoute : ActivatedRoute,
    private router        : Router,
    private sharedService : SharedService 
  ) {}

  ngOnInit(): void {
    const idUser = parseInt( localStorage.getItem('id') ?? '' );

    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.sharedService.getUserById( id ) )
    )
    .subscribe( response => {
      this.user = response;
      console.log(response);
      

      // Mostrar los botones de editar y eliminar solo si es el usuario en la sesión activa
      if ( response.id == idUser ) {
        this.showButtons = true;
      }

      this.sharedService.getStateById( response.id_state ).subscribe( response => {
        this.state = response;
      });
    });
  }

  deletePublication( id : number ) {
    // Swal.fire({
    //   title: '¿Deseas eliminar la publicación?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonColor: '#3085D6',
    //   cancelButtonColor: '#D33',
    //   confirmButtonText: 'Eliminar'
    // }).then(( result ) => {
    //   if ( result.isConfirmed ) {
    //     this.sharedService.deletePublicationById( id ).subscribe( response => {
    //       Swal.fire(
    //         'Publicación eliminada.'
    //       ).then(() => {
    //         this.router.navigate(['/dashboard/post']);
    //       });
    //     });
    //   }
    // })
  }

}
