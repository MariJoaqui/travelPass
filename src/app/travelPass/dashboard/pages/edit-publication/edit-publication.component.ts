import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

// Librerías
import Swal from 'sweetalert2';

// Services
import { SharedService } from 'src/app/shared/services/shared.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

// Interfaces
import { CardItems, States } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent implements OnInit {

  // Variables y arreglos
  coverImage    : SafeUrl = '';
  publications! : CardItems;
  states        : States[] = [];

  // Servicios
  constructor( 
    private activateRoute : ActivatedRoute,
    private fb            : FormBuilder,
    private router        : Router,
    private sharedService : SharedService,
    private Validator     : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    title            : [ '', [ Validators.minLength(10), Validators.maxLength(100) ] ],
    price            : [ '', [ Validators.minLength(2), Validators.pattern( this.Validator.priceFormat ) ] ],
    limit            : [ '', [ Validators.maxLength(1), Validators.pattern( this.Validator.numberFormat ) ] ],
    state            : [ '' ],
    description      : [ '', [ Validators.minLength(50), Validators.maxLength(500) ] ],
    coverImage       : [ '' ]
  });

  ngOnInit(): void {
    this.sharedService.getStates().subscribe( response => this.states = response );

    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.sharedService.getPublicationsById( id ) )
    )
    .subscribe( response => {
      this.publications = response;
    });
  }

  invalidField( fieldName : string ) {
    return this.form.get( fieldName )?.invalid && this.form.get( fieldName )?.touched;
  }

  errorMessage( fieldName : string ): string {
    const field = this.form.get( fieldName );

    if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto.'
    }
    return '';
  }
  
  validateMinMax( fieldName : string, minLength : number, maxLength : number ): string {
    const field = this.form.get( fieldName );
  
    if ( field?.errors?.['minlength']  ) {
      return `Debe contener al menos ${ minLength } caracteres.`;
    }
    else if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo ${ maxLength } caracteres.`;
    }
    return '';
  }

  get validateLimit() {
    const field = this.form.get( 'limit' );
  
    if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo 1 caracter.`;
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto. Solo valores del 1 al 8.';
    }
    return '';
  }

  get validatePrice() {
    const field = this.form.get( 'price' );
  
    if ( field?.errors?.['minlength'] ) {
      return `Debe contener máximo 2 caracteres.`;
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'Solo valores del 10 en adelante y solo se aceptan 2 decimales.';
    }
    return '';
  }

  onCoverImageChange( event : any ): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      this.coverImage = base64Image;
    };
    reader.readAsDataURL( file );
  }

  hasValue(): boolean {
    for ( const controlName in this.form.controls ) {
      const control = this.form.controls[controlName];
      if ( control.value && control.valid ) {
        return true;
      }
    }
    return false;
  }  

  update() {
    const title       = this.form.get('title')?.value;
    const price       = this.form.get('price')?.value;
    const limit       = this.form.get('limit')?.value; 
    const id_state    = this.form.get('state')?.value; 
    const description = this.form.get('description')?.value;
    
    this.sharedService.updatePublication( this.publications.id, id_state, this.coverImage, title, description, limit, price ).subscribe( response => {
      if ( response.success == true ) {
        Swal.fire('¡Se actualizaron los datos!', 'Mira tus publicaciones para mas detalles.', 'success').then(( result ) => {
          if ( result.isConfirmed ) {
            this.router.navigate(['/dashboard/post']);
          }
        });
        console.log( response );
      }
    })
  }
  
}
