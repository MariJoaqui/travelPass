import { Component, OnInit } from '@angular/core';

// Interfaces
import { Faqs } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  // Variables y arreglos
  collapsedStates: boolean[] = [];

  // Preguntas frecuentes
  faqs: Faqs[] = [
    { title: '¿Quién puede publicar el TravelPass?', description: 'TravelPass es una plataforma en la que pueden interactuar tanto empresas (hoteles o posadas) como personas que cuenten con alguna propiedad en algún sitio turistico de Venezuela que desean poner en alquiler por noches.' },
    { title: '¿Quién coloca los precios y planes?', description: 'Cada uno de los usuarios que hacen vida en nuestra plataforma son los encargados de escoger el precio que desean colocarle a sus propiedades, igualmente ocurre con los planes.' },
    { title: '¿Cuántas publicaciones se pueden realizar?', description: 'No existe un límite de publicaciones a realizar por el momento.' },
    { title: '¿De qué forma me puedo comunicar con los usuarios?', description: 'Para registrarte en TravelPass es necesario que ingreses tu correo electrónico y coloques un número telefónico para que los usuarios puedan contactarte.' }
  ];

  // Mantiene abierta la primera pregunta cadfa vez que se inicia 
  ngOnInit(): void {
    this.collapsedStates = this.faqs.map( ( _, index ) => index == 0 );
  }

  // Para abrir y cerrar cada carta cuando sea necesario
  toggleCollapse( index: number ): void {
    this.collapsedStates[index] = !this.collapsedStates[index];
  }

  isCollapsed( index: number ): boolean {
    return this.collapsedStates[index];
  }

}
