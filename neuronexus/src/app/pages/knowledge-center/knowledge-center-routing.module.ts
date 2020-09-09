import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeCenterComponent } from './knowledge-center/knowledge-center.component';
import { ListComponent } from './list/list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubCategoryDetailsComponent } from './sub-category-details/sub-category-details.component';


const routes: Routes = [
  {
    path: 'knowledge-center',
    component: KnowledgeCenterComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'category-details/:categorySlug/:categoryName',
        component: CategoryDetailsComponent
      },
      {
        path: 'sub-category-details/:subCategorySlug/:subCategoryName',
        component: SubCategoryDetailsComponent
      },
      {
        path: '',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeCenterRoutingModule { }
