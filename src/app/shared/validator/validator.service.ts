import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  // Variables de validación
  emailFormat    : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nameFormat     : string = "^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,100}$"; 
  numberFormat   : string = "^[1-8]$";
  priceFormat    : string = "^\d+(\.\d+)?$";
 
  // Funciones para validar
  equalFields( field1: string, field2: string ) {
    return( formGroup: AbstractControl ): ValidationErrors | null => {
      
      const password1 = formGroup.get( field1 )?.value;
      const password2 = formGroup.get( field2 )?.value;
      
      if ( password1 !== password2 ) {
        formGroup.get( field2 )?.setErrors({ noIguales: true });
        return { noIguales: true }
      }

      formGroup.get( field2 )?.setErrors(null);
      return null;
    }
  }

}
