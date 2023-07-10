import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Servicios 
import { SharedService } from 'src/app/shared/services/shared.service';

// Interfaces
import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users : User[] = [];

  constructor( 
    private domSanitizer  : DomSanitizer,
    private sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUsers().subscribe( response => {
      this.users = response.map( user => {
        const safeImageUrl = this.convertBase64ToSafeUrl( user.image );
        return { ...user, safeImageUrl };
      });
      console.log(response);
    });
  }

  convertBase64ToSafeUrl( base64Image : string ): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.domSanitizer.bypassSecurityTrustUrl( imageUrl );
  }

}
