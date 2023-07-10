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
  cards      : CardItems[] = [];
  searchText : string = '';

  constructor( private sharedService : SharedService ) {}

  ngOnInit(): void {
    const id_user = parseInt( localStorage.getItem('id')??'' );

    this.sharedService.getMyPublications( id_user ).subscribe( response => {
      this.cards = response;
      console.log( response );
    });
  }

  filterCards(): CardItems[] {
    return this.cards.filter( ( card ) =>
      card.title.toLowerCase().includes( this.searchText.toLowerCase() )
    );
  }

}
