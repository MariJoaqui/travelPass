import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Librerías
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../../services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

// Interfaces
import { States } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Variables y arreglos
  image  : SafeUrl = '';
  states : States[] = [];

  // Servicios
  constructor( 
    private fb            : FormBuilder,
    private authService   : AuthService,
    private router        : Router,
    private sharedService : SharedService,
    private Validator     : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    name        : [ '', [ Validators.required, Validators.pattern( this.Validator.nameFormat ) ] ],
    lastName    : [ '', [ Validators.required, Validators.pattern( this.Validator.nameFormat ) ] ],
    state       : [ '', [ Validators.required ] ],
    email       : [ '', [ Validators.required, Validators.pattern( this.Validator.emailFormat ) ] ],
    phoneNumber : [ '', [ Validators.required, Validators.maxLength(11), Validators.pattern( this.Validator.phoneFormat ) ] ],
    password1   : [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(18) ] ],
    password2   : [ '', [ Validators.required ] ],
    image       : [ '', [ Validators.required ] ]
  },
  {
    validators: [ this.Validator.equalFields( 'password1', 'password2' ) ]
  });

  ngOnInit(): void {
    this.sharedService.getStates().subscribe( response => this.states = response );
  }

  invalidField( fieldName : string ) {
    return this.form.get( fieldName )?.invalid && this.form.get( fieldName )?.touched;
  }

  errorMessage( fieldName : string ): string {
    const field = this.form.get( fieldName );

    if ( field?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto.'
    }
    return '';
  }

  get validatePhoneNumber() {
    const field = this.form.get( 'phoneNumber' );
  
    if ( field?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo 11 caracteres.`;
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto. Solo se aceptan números.';
    }
    return '';
  }

  get validatePassword1() {
    const field = this.form.get('password1');

    if ( field?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( field?.errors?.['minlength'] ) {
      return 'Debe contener al menos 8 caracteres.';
    }
    else if ( field?.errors?.['maxlength'] ) {
      return 'Debe contener máximo 18 caracteres.';
    }
    return '';
  }

  onImageChange( event : any ): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      this.image = base64Image;
    };
    reader.readAsDataURL( file );
  }

  signup() {
    const name        = this.form.get('name')?.value;
    const lastName    = this.form.get('lastName')?.value;
    const state       = this.form.get('state')?.value;
    const phoneNumber = this.form.get('phoneNumber')?.value;
    const email       = this.form.get('email')?.value;
    const password    = this.form.get('password2')?.value;

    this.authService.signup( state, name, lastName, phoneNumber, email, password, this.image ).subscribe( response => { 
      if ( response.success == true ) {
        Swal.fire('¡Usuario creado con éxito!', 'Inicia sesión para comenzar a explorar.', 'success').then(( result ) => {
          if ( result.isConfirmed ) {
            this.router.navigate(['/auth/login']);
          }
        });
        console.log( response );
      }
    })
  }

}
