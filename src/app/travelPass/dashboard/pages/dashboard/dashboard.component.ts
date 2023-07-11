import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Servicios 
import { SharedService } from 'src/app/shared/services/shared.service';

// Interfaces
import { CardItems } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Variables y arreglos
  cards      : CardItems[] = [];
  searchText : string = '';
  states     : string[] = [];

  constructor( 
    private domSanitizer  : DomSanitizer,
    private sharedService : SharedService,
  ) {}

  ngOnInit(): void {
    this.sharedService.getPublications().subscribe( response => {
      this.cards = response.map( card => {
        const safeImageUrl = this.convertBase64ToSafeUrl( card.image );
        return { ...card, safeImageUrl };
      });
      console.log(response);
    });
  }

  convertBase64ToSafeUrl( base64Image : string ): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.domSanitizer.bypassSecurityTrustUrl( imageUrl );
  }

  filterCards(): CardItems[] {
    return this.cards.filter( ( card ) =>
      card.title.toLowerCase().includes( this.searchText.toLowerCase() )
    );
  }

}
