import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

// Servicios
import { SharedService } from '../services/shared.service';

// Interfaces
import { CardItems } from '../interfaces/interfaces';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications! : CardItems;
  state!        : any;
  user          : any;

  constructor ( 
    private activateRoute : ActivatedRoute,
    private sharedService : SharedService 
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.sharedService.getPublicationsById( id ) )
    )
    .subscribe( response => {
      this.publications = response;

      this.sharedService.getStateById( response.id_state ).subscribe( response => {
        this.state = response;
      });

      this.sharedService.getUserById( response.id_profile ).subscribe( response => {
        this.user = response;
      });
    });
  }

}
