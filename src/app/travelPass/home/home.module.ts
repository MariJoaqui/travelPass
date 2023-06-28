import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';


@NgModule({
  declarations: [
    HomeComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
