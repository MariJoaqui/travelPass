import { Component } from '@angular/core';

// Interfaces
import { CardItems, NavItems } from 'src/app/shared/interfaces/interfaces';

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
  cardItems: CardItems[] = [
    // {
    //   image: '../../../../../assets/img/image/carta-1.jpg',
    //   title: 'Plan Margarita',
    //   description: 'Disfruta de 3 días y 2 noches en esta hermosa isla con toda tu familia.',
    //   limit: '5 personas',
    //   price: '450',
    //   ubication: 'Margarita, Nueva Esparta.'
    // },
    // {
    //   image: '../../../../../assets/img/image/carta-2.jpg',
    //   title: 'Plan Margarita',
    //   description: 'Disfruta de 3 días y 2 noches en esta hermosa isla con toda tu familia.',
    //   limit: '5 personas',
    //   price: '450',
    //   ubication: 'Margarita, Nueva Esparta.'
    // },
    // {
    //   image: '../../../../../assets/img/image/carta-3.jpg',
    //   title: 'Plan Margarita',
    //   description: 'Disfruta de 3 días y 2 noches en esta hermosa isla con toda tu familia.',
    //   limit: '5 personas',
    //   price: '450',
    //   ubication: 'Margarita, Nueva Esparta.'
    // }
  ];

}
