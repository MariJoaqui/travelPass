import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { SavedComponent } from './pages/saved/saved.component';
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostComponent,
    SavedComponent,
    AddPublicationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
