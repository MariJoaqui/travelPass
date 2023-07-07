import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

// Interfaces
import { CardItems, Image, States } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Variables
  private _url : string = environment.apiUrl; 

  // Servicios externos
  constructor( private http: HttpClient ) { }

  // Funciones
  getMyPublications( id_user : number ): Observable<CardItems[]> {
    return this.http.get<CardItems[]>(`${ this._url }/procesos/getMisPublicaciones.php?id_user=${ id_user }`);
  }

  getPublications(): Observable<CardItems[]> {
    return this.http.get<CardItems[]>(`${ this._url }/procesos/getPublicaciones.php`);
  }

  getStates(): Observable<States[]> {
    return this.http.get<States[]>(`${ this._url }/procesos/getEstados.php`);
  }

}
