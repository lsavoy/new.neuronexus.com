import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScienceUpdateComponent } from './science-update/science-update.component';
import { ScienceUpdateDetailsComponent } from './science-update-details/science-update-details.component';
import { ScienceUpdateListComponent } from './science-update-list/science-update-list.component';


const routes: Routes = [
  {
    path: 'science-update',
    component: ScienceUpdateComponent,
    children: [
      {
        path: 'science-update-list',
        component: ScienceUpdateListComponent
      },
      {
        path: 'science-update-details/:scienceSlug',
        component: ScienceUpdateDetailsComponent
      },
      {
        path: '',
        redirectTo: 'science-update-list'
        // redirectTo: 'science-update-details/:scienceItemId'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScienceUpdateRoutingModule { }
