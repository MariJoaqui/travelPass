import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { FooterComponent } from './footer/footer.component';
import { GoBackComponent } from './go-back/go-back.component';
import { LogoNameComponent } from './logo-name/logo-name.component';


@NgModule({
  declarations: [
    FooterComponent,
    GoBackComponent,
    LogoNameComponent,
    DashboardNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardNavComponent,
    FooterComponent,
    GoBackComponent,
    LogoNameComponent
  ]
})
export class SharedModule { }
