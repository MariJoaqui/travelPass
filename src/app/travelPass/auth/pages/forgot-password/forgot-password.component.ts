import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Librerías
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  // Servicios
  constructor( 
    private authService   : AuthService,
    private fb            : FormBuilder,
    private router        : Router,
    private Validator     : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    email : [ '', [ Validators.required, Validators.pattern( this.Validator.emailFormat ) ] ]
  });

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

  searchEmail() {
    const email = this.form.get('email')?.value;

    this.authService.searchEmail( email ).subscribe( response => {
      if ( response.success == true ) {
        Swal.fire( '¿Olvidaste tu contraseña?', 'No te preocupes, a continuación podrás establecer una nueva.', 'info' ).then(( result ) => {
          if ( result.isConfirmed ) {
            this.router.navigate(['/auth/new-password', response.id ]);
          }
        });
      }
      else {
        Swal.fire( 'Intenta de nuevo.' , 'El correo electrónico no se ha encontrado en nustra base de datos.', 'error' ).then(( result ) => {
          if ( result.isConfirmed ) {
            this.form.reset();
          }
        });
      }
    },
    error => {
      console.log( error );
    });
  }

}
