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
import { States, User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-profile-changes',
  templateUrl: './profile-changes.component.html',
  styleUrls: ['./profile-changes.component.css']
})
export class ProfileChangesComponent implements OnInit {

  // Variables y arreglos
  image  : SafeUrl = '';
  states : States[] = [];
  user!  : User;

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
    name        : [ '', [ Validators.pattern( this.Validator.nameFormat ) ] ],
    lastName    : [ '', [ Validators.pattern( this.Validator.nameFormat ) ] ],
    state       : [ '' ],
    phoneNumber : [ '', [ Validators.maxLength(11), Validators.pattern( this.Validator.phoneFormat ) ] ],
    email       : [ '', [ Validators.pattern( this.Validator.emailFormat ) ] ],
    password    : [ '', [ Validators.minLength(8), Validators.maxLength(18) ] ],
    image       : [ '' ]
  });

  ngOnInit(): void {
    this.sharedService.getStates().subscribe( response => this.states = response );

    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.sharedService.getUserById( id ) )
    )
    .subscribe( response => {
      this.user = response;
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

  get validatePhoneNumber() {
    const field = this.form.get( 'phoneNumber' );
  
    if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo 11 caracteres.`;
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto. Solo se aceptan números.';
    }
    return '';
  }

  get validatePassword() {
    const field = this.form.get('password');

    if ( field?.errors?.['minlength'] ) {
      return 'Debe contener al menos 8 caracteres.';
    }
    else if ( field?.errors?.['maxlength'] ) {
      return 'Debe contener máximo 18 caracteres.';
    }
    return '';
  }

  onCoverImageChange( event : any ): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      this.image = base64Image;
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
    const name        = this.form.get('name')?.value;
    const lastName    = this.form.get('lastName')?.value;
    const state       = this.form.get('state')?.value;
    const phoneNumber = this.form.get('phoneNumber')?.value;
    const email       = this.form.get('email')?.value;
    const password    = this.form.get('password')?.value;
    
    this.sharedService.updateUser( this.user.id, state, name, lastName, phoneNumber, email, password, this.image ).subscribe( response => {
      if ( response.success == true ) {
        Swal.fire('¡Se actualizaron tus datos!', 'Mira tu perfil para mas detalles.', 'success').then(( result ) => {
          if ( result.isConfirmed ) {
            this.router.navigate(['dashboard/profile-details', this.user.id ]);
          }
        });
        console.log( response );
      }
    })
  }

}
