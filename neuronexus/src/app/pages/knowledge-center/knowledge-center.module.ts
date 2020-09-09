import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeCenterRoutingModule } from './knowledge-center-routing.module';
import { KnowledgeCenterComponent } from './knowledge-center/knowledge-center.component';
import { ListComponent } from './list/list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubCategoryDetailsComponent } from './sub-category-details/sub-category-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    KnowledgeCenterComponent,
    ListComponent,
    CategoryDetailsComponent,
    SubCategoryDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    KnowledgeCenterRoutingModule,
  ]
})
export class KnowledgeCenterModule { }
