import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostComponent } from './pages/post/post.component';
import { SavedComponent } from './pages/saved/saved.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'post', component: PostComponent },
      { path: 'saved', component: SavedComponent },
      { path: 'new-publication', component: AddPublicationComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
