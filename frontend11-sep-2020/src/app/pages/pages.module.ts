import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ModalModule } from '../modal/modal.module';
import { LoaderModule } from '../loader/loader.module';
import { ParticlesModule } from 'ngx-particle';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TeamComponent } from './team/team.component';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrainInitiativeComponent } from './brain-initiative/brain-initiative.component';
import { ScienceUpdateCollaborationComponent } from './science-update-collaboration/science-update-collaboration.component';
import { CareersComponent } from './careers/careers.component';
import { DistributionComponent } from './distribution/distribution.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrainHackerComponent } from './brain-hacker/brain-hacker.component';
import { SupportComponent } from './support/support.component';
import { SupportDetailsComponent } from './support-details/support-details.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ProductCategoryDetailsComponent } from './product-category-details/product-category-details.component';
import { ProbeFinderComponent } from './probe-finder/probe-finder.component';
import { ProbeDetailsComponent } from './probe-details/probe-details.component';
import { CatalogsBrochuresComponent } from './catalogs-brochures/catalogs-brochures.component';
import { ScienceDetailsComponent } from './science-details/science-details.component';
import { TechnologyDetailsComponent } from './technology-details/technology-details.component';
import { TechnologyComponent } from './technology/technology.component';





@NgModule({
  declarations: [HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
    ProductDetailsComponent,
    TeamComponent,
    BrainInitiativeComponent,
    ScienceUpdateCollaborationComponent,
    CareersComponent,
    DistributionComponent,
    BrainHackerComponent,
    SupportComponent,
    SupportDetailsComponent,
    SearchResultComponent,
    ProductCategoryDetailsComponent,
    ProbeFinderComponent,
    ProbeDetailsComponent,
    CatalogsBrochuresComponent,
    ScienceDetailsComponent,
    TechnologyDetailsComponent,
    TechnologyComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ModalModule,
    LoaderModule,
    ParticlesModule,
    SharedModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class PagesModule { }
