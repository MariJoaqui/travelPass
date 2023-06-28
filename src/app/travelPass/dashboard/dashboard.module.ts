import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { DashboardRoutingModule } from './dashboard-routing.module';

// Componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
