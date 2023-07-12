import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Módulos
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditPublicationComponent } from './pages/edit-publication/edit-publication.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { ProfileChangesComponent } from './pages/profile-changes/profile-changes.component';

@NgModule({
  declarations: [
    AddPublicationComponent,
    DashboardComponent,
    PostComponent,
    ProfileComponent,
    EditPublicationComponent,
    ProfileDetailsComponent,
    ProfileChangesComponent
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
