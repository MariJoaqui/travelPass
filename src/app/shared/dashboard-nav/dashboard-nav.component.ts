import { Component } from '@angular/core';

// Interfaces
import { NavItems } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {

  navItems : NavItems[] = [
    { item: 'Catálogo', link: '/dashboard' },
    { item: 'Publicar', link: '/dashboard/post' },
    { item: 'Guardados', link: '/dashboard/saved' }
  ];

}
