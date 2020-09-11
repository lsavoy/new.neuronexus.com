import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScienceUpdateRoutingModule } from './science-update-routing.module';
import { ScienceUpdateComponent } from './science-update/science-update.component';
import { ScienceUpdateDetailsComponent } from './science-update-details/science-update-details.component';
import { SharedModule } from '../../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ScienceUpdateListComponent } from './science-update-list/science-update-list.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [ScienceUpdateComponent, ScienceUpdateDetailsComponent, ScienceUpdateListComponent],
  imports: [
    CommonModule,
    SharedModule,
    SlickCarouselModule,
    NgxPaginationModule,
    ScienceUpdateRoutingModule,
  ]
})
export class ScienceUpdateModule { }
