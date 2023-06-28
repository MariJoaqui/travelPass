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
    { title: 'Pregunta 1', description: 'respuesta pregunta 1' },
    { title: 'Pregunta 2', description: 'respuesta pregunta 2' },
    { title: 'Pregunta 3', description: 'respuesta pregunta 3' },
    { title: 'Pregunta 4', description: 'respuesta pregunta 4' }
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
