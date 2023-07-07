import { Component, OnInit } from '@angular/core';

// Servicios 
import { SharedService } from 'src/app/shared/services/shared.service';

// Interfaces
import { CardItems, Image } from 'src/app/shared/interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Variables y arreglos
  cards    : CardItems[] = [];
  images   : Image[] = [];

  constructor( 
    private sanitizer     : DomSanitizer ,
    private sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getPublications().subscribe( response => { 
      this.cards = response;
      this.cards.forEach( card => {
        const blob = this.base64toBlob( card.image );
        const imageUrl = this.sanitizer.bypassSecurityTrustUrl( URL.createObjectURL( blob ) );
        card.image = imageUrl;
      });
      console.log( response ); 
    });
  }

  // Corvertir imagenes 
  base64toBlob( base64Data : string ): Blob {
    const byteCharacters = atob( base64Data );
    const byteArrays = [];
    for ( let offset = 0; offset < byteCharacters.length; offset += 512 ) {
      const slice = byteCharacters.slice( offset, offset + 512 );
      const byteNumbers = new Array( slice.length );
      for ( let i = 0; i < slice.length; i++ ) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array( byteNumbers );
      byteArrays.push( byteArray );
    }
    return new Blob( byteArrays, { type: 'image/jpeg' } );
  }
  
}
