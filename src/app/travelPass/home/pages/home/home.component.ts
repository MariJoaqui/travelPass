import { Component } from '@angular/core';

// Interfaces
import { NavItems } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Enlaces del Nav
  navItems: NavItems[] = [
    { item: 'Inicio', link: '' },
    { item: 'Sobre nosotros', link: '' },
    { item: '¿Qué ofrecemos?', link: '' }
  ];

  // Cartas de ofertas de ejemplos
  cardItems: any[] = [
    {
      image: '../../../../../assets/img/image/1.jpg',
      title: 'Casa en Morrocoy',
      description: 'Disfruta de 3 días y 2 noches en esta hermosa casita con toda tu familia...',
      limit: '5 personas',
      price: '450$',
      ubication: 'Falcón, Venezuela.'
    },
    {
      image: '../../../../../assets/img/image/2.jpg',
      title: 'Plan Tropical',
      description: 'Te proporcionamos una habitación con baño y cocina al estilo tropical...',
      limit: '2 personas',
      price: '180$',
      ubication: 'Margarita, Venezuela.'
    },
    {
      image: '../../../../../assets/img/image/3.jpg',
      title: 'Habitación en Adicora',
      description: 'Cuarto o habitación para 2 personas por 2 noches y 3 días. te brindamos...',
      limit: '2 personas',
      price: '120$',
      ubication: 'Falcón, Venezuela.'
    }
  ];

}
