import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment.development';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Interfaces
import { CardItems, States, User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Variables
  private _url : string = environment.apiUrl; 

  // Servicios externos
  constructor( private http: HttpClient ) { }

  // Delete
  deletePublicationById( id : number ) {
    return this.http.get( `${ this._url }/procesos/deletePublicacion.php?id=${ id }` );
  }

  // Get
  getMyPublications( id_user : number ): Observable<CardItems[]> {
    return this.http.get<CardItems[]>( `${ this._url }/procesos/getMisPublicaciones.php?id_user=${ id_user }` );
  }

  getPublications(): Observable<CardItems[]> {
    return this.http.get<CardItems[]>( `${ this._url }/procesos/getPublicaciones.php` );
  }

  getPublicationsById( id : number ): Observable<CardItems> {
    return this.http.get<CardItems>( `${ this._url }/procesos/getPublicacionesPorId.php?id=${ id }` );
  }

  getStates(): Observable<States[]> {
    return this.http.get<States[]>( `${ this._url }/procesos/getEstados.php` );
  }

  getStateById( id : number ): Observable<string> {
    return this.http.get<string>( `${ this._url }/procesos/getEstadosPorId.php?id=${ id }` );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>( `${ this._url }/procesos/getUsuarios.php` );
  }

  getUserById( id : number ): Observable<User> {
    return this.http.get<User>( `${ this._url }/procesos/getUsuarioPorId.php?id=${ id }` );
  }

  // Post
  postPublications( id_state : number, id_profile : number, image : any, title : string, description : string, limit : string, price : string ): Observable<CardItems> {
    const data = {
      state       : id_state,
      user        : id_profile,
      coverImage  : image,
      title       : title,
      description : description,
      limit       : limit,
      price       : price
    };
    
    return this.http.post<CardItems>( `${ this._url }/procesos/nuevaPublicacion.php`, JSON.stringify(data), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Put
  updatePublication( id : number, id_state : number, image : any, title : string, description : string, limit : string, price : string ): Observable<CardItems> {
    const data = {
      id          : id,
      id_state    : id_state,
      coverImage  : image,
      title       : title,
      description : description,
      limit       : limit,
      price       : price
    };

    return this.http.post<CardItems>( `${ this._url }/procesos/updatePublicacion.php?id=${ id }`, JSON.stringify(data), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }  

  updateUser( id : number, id_state : number, name : string, lastName : string, phoneNumber : string, email : string, password : string, image : any ): Observable<CardItems> {
    const data = {
      id          : id,
      id_state    : id_state,
      name        : name,
      lastName    : lastName,
      phoneNumber : phoneNumber,
      email       : email,
      password    : password,
      image       : image
    };

    return this.http.post<CardItems>( `${ this._url }/procesos/updateUsuario.php?id=${ id }`, JSON.stringify(data), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }  

}
