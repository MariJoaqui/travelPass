import { Component, OnInit } from '@angular/core';

// Servicios
import { SharedService } from 'src/app/shared/services/shared.service';

// Interfaces
import { CardItems } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // Variables y arreglos
  cards    : CardItems[] = [];

  constructor( private sharedService : SharedService ) {}

  ngOnInit(): void {
    const id_user = parseInt( localStorage.getItem('id')??'' );

    this.sharedService.getMyPublications( id_user ).subscribe( response => {
      this.cards = response;
      console.log( response );
    });
  }

}
