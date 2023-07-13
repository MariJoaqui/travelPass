import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

// Librerías
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  // Variables y arreglos
  id! : number;

  // Servicios
  constructor( 
    private activateRoute : ActivatedRoute,
    private authService   : AuthService,
    private fb            : FormBuilder,
    private router        : Router,
    private Validator     : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    password1   : [ '', [ Validators.required, Validators.minLength(8), Validators.maxLength(18) ] ],
    password2   : [ '', [ Validators.required ] ],
  },
  {
    validators: [ this.Validator.equalFields( 'password1', 'password2' ) ]
  });

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => { this.id = +params['id']; });
  }

  invalidField( fieldName : string ) {
    return this.form.get( fieldName )?.invalid && this.form.get( fieldName )?.touched;
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

  changePassword() {
    const password = this.form.get('password2')?.value;

    this.authService.updatePassword( this.id, password ).subscribe( response => {
      if ( response.success == true ) {
        Swal.fire('¡Contraseña modificada!', 'Inicia sesión para explorar en TravelPass.', 'success').then(( result ) => {
          if ( result.isConfirmed ) {
            this.router.navigate(['/auth/login']);
          }
        });
        console.log( response );
      }
    });
  }

}
