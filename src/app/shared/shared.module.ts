import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { FooterComponent } from './footer/footer.component';
import { GoBackComponent } from './go-back/go-back.component';
import { LogoNameComponent } from './logo-name/logo-name.component';
import { PublicationsComponent } from './publications/publications.component';
import { FooterSmComponent } from './footer-sm/footer-sm.component';


@NgModule({
  declarations: [
    DashboardNavComponent,
    FooterComponent,
    GoBackComponent,
    LogoNameComponent,
    PublicationsComponent,
    FooterSmComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardNavComponent,
    FooterComponent,
    FooterSmComponent,
    GoBackComponent,
    LogoNameComponent,
    PublicationsComponent
  ]
})
export class SharedModule { }
