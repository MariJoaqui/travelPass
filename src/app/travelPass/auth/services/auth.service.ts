import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

// Interfaces
import { User, UserLogin } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  private _url : string = environment.apiUrl; 

  // Servicios externos
  constructor( private http: HttpClient ) { }

  // Función de logeo
  login( email: string, password: string ): Observable<UserLogin> {
    const data = {
      email: email,
      password: password
    };
    return this.http.post<UserLogin>(`${ this._url }/conexion/proceso-login.php`, JSON.stringify( data ), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Validar la sesión 
  authUser(): boolean {
    const tk = localStorage.getItem('id');
    return tk !== null && tk !== "";
  }  

  // Registro
  signup( state : number, name : string, lastName : string, email : string, password : string ): Observable<User> {
    const data = {
      state    : state,
      name     : name,
      lastName : lastName,
      email    : email,
      password : password
    }
    return this.http.post<User>(`${ this._url }/procesos/nuevoUsuario.php`, JSON.stringify( data ), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

}
