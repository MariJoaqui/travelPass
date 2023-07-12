import { Component } from '@angular/core';

// interfaces
import { NavItems, SocialMedia } from '../interfaces/interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  socialMedia: SocialMedia[] = [
    { name: 'TravelPass' , icon: 'fa-brands fa-facebook', link: '' },
    { name: '@travel_pass' , icon: 'fa-brands fa-instagram', link: '' },
    { name: '@travel_pass' , icon: 'fa-brands fa-twitter', link: '' },
    { name: '@travel_pass' , icon: 'fa-brands fa-tiktok', link: '' },
    { name: 't_pass@gmail.com' , icon: 'fa-solid fa-envelope', link: '' },
  ];

}
