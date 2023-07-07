import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { SharedService } from 'src/app/shared/services/shared.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

// Interfaces
import { States } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {

  // Variables y arreglos
  states : States[] = [];

  // Servicios
  constructor( 
    private fb            : FormBuilder,
    private router        : Router,
    private sharedService : SharedService,
    private Validator     : ValidatorService
  ) {}

  // Formulario y validaciones
  form: FormGroup = this.fb.group({  
    title            : [ '', [ Validators.required, Validators.minLength(10), Validators.maxLength(100) ] ],
    price            : [ '', [ Validators.required, Validators.maxLength(2), Validators.pattern( this.Validator.priceFormat ) ] ],
    limit            : [ '', [ Validators.required, Validators.maxLength(1), Validators.pattern( this.Validator.numberFormat ) ] ],
    state            : [ '', [ Validators.required ] ],
    description      : [ '', [ Validators.required, Validators.minLength(50), Validators.maxLength(500) ] ],
    coverImage       : [ '', [ Validators.required ] ],
    additionalImages : [ '', [ Validators.required ] ]
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
  
  validateMinMax( fieldName : string, minLength : number, maxLength : number ): string {
    const field = this.form.get( fieldName );
  
    if ( field?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( field?.errors?.['minlength']  ) {
      return `Debe contener al menos ${ minLength } caracteres.`;
    }
    else if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo ${ maxLength } caracteres.`;
    }
    return '';
  }

  validateLimit( fieldName : string, maxLength : number ) {
    const field = this.form.get( fieldName );
  
    if ( field?.errors?.['required'] ) {
      return 'El campo es obligatorio.';
    }
    else if ( field?.errors?.['maxlength'] ) {
      return `Debe contener máximo 1 caracter.`;
    }
    else if ( field?.errors?.['pattern'] ) {
      return 'El formato es incorrecto. Solo valores del 1 al 9.'
    }
    return '';
  }

  submit() {

  }
}
