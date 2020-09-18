import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { MaterialModule } from '../material.module';
import { TeamBioComponent } from './team-bio/team-bio.component';



@NgModule({
  declarations: [
    DefaultComponent,
    TeamBioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    DefaultComponent
  ]
})
export class ModalModule { }
