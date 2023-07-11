import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Librerías 
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Servicios
  constructor( 
    private authService  : AuthService,
    private fb           : FormBuilder,
    private router       : Router,
    private Validator    : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    email    : [ '', [ Validators.required, Validators.pattern( this.Validator.emailFormat ) ] ],
    password : [ '', [ Validators.required, Validators.minLength(8) ] ]
  });

  // Mostrar los mensajes de error
  invalidField( fieldName : string ) {
    return this.form.get( fieldName )?.invalid && this.form.get( fieldName )?.touched;
  }

  get errorMessage(): string {
    if ( this.form.get('email')?.errors?.['required'] || this.form.get('password')?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( this.form.get('email')?.errors?.['pattern'] || this.form.get('password')?.errors?.['pattern']) {
      return 'El formato es incorrecto.'
    }
    return '';
  }
  
  login() {

    // Valores obtenidos del formulario
    const email    = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    // Envía y recibe una respuesta del servidor
    this.authService.login( email, password ).subscribe( response => {

      // Validar el ingreso
      if ( response.success == true ) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido a TravelPass!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Guardar el id del usuario en el local storage
          localStorage.setItem('id', response.user.id.toString());
          console.log( response.user );
              
          // Ruta luego del acceso 
          this.router.navigate(['/dashboard']);
        });
      } 
      else {
        Swal.fire({
          icon: 'error',
          text: 'Los datos ingresados son incorrectos.'
        }).then(() => {
          this.form.reset();
        });
        console.log('Datos incorrectos');
      }
      
    },
    error => {
      console.log(error);
    });
  }

}
