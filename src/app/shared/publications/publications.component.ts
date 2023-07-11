import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

// Librerías
import Swal from 'sweetalert2';

// Servicios
import { SharedService } from '../services/shared.service';

// Interfaces
import { CardItems } from '../interfaces/interfaces';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications! : CardItems;
  showButtons   : boolean = false;
  state!        : any;
  user          : any;

  constructor ( 
    private activateRoute : ActivatedRoute,
    private router        : Router,
    private sharedService : SharedService 
  ) {}

  ngOnInit(): void {
    const idUser = parseInt( localStorage.getItem('id') ?? '' );

    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.sharedService.getPublicationsById( id ) )
    )
    .subscribe( response => {
      this.publications = response;

      // Mostrar los botones de editar y eliminar solo si es el usuario en la sesión activa
      if ( response.id_profile == idUser ) {
        this.showButtons = true;
      }

      this.sharedService.getStateById( response.id_state ).subscribe( response => {
        this.state = response;
      });

      this.sharedService.getUserById( response.id_profile ).subscribe( response => {
        this.user = response;
      });
    });
  }

  deletePublication( id : number ) {
    Swal.fire({
      title: '¿Deseas eliminar la publicación?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Eliminar'
    }).then(( result ) => {
      if ( result.isConfirmed ) {
        this.sharedService.deletePublicationById( id ).subscribe( response => {
          Swal.fire(
            'Publicación eliminada.'
          ).then(() => {
            this.router.navigate(['/dashboard/post']);
          });
        });
      }
    })
  }

}
