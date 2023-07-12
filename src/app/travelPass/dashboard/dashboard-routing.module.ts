import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditPublicationComponent } from './pages/edit-publication/edit-publication.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileChangesComponent } from './pages/profile-changes/profile-changes.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { PublicationsComponent } from 'src/app/shared/publications/publications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'post', component: PostComponent },
      { path: 'profiles', component: ProfileComponent },
      { path: 'new-publication', component: AddPublicationComponent },
      { path: 'publication-details/:id', component: PublicationsComponent },
      { path: 'edit-publication/:id', component: EditPublicationComponent },
      { path: 'profile-details/:id', component: ProfileDetailsComponent },
      { path: 'edit-profile/:id', component: ProfileChangesComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
