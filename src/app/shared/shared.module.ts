import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FooterComponent } from './footer/footer.component';
import { LogoNameComponent } from './logo-name/logo-name.component';


@NgModule({
  declarations: [
    FooterComponent,
    LogoNameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    LogoNameComponent
  ]
})
export class SharedModule { }
