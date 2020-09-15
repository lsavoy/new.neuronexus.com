import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TeamComponent } from './team/team.component';
import { BrainInitiativeComponent } from './brain-initiative/brain-initiative.component';
import { CareersComponent } from './careers/careers.component';
import { DistributionComponent } from './distribution/distribution.component';
import { ScienceUpdateCollaborationComponent } from './science-update-collaboration/science-update-collaboration.component';
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
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialDetailsComponent } from './testimonial-details/testimonial-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product-details/:productSlug',
    component: ProductDetailsComponent
  },
  {
    path: 'probe-details/:probeSlug',
    component: ProbeDetailsComponent
  },
  {
    path: 'product-category-details/:categorySlug',
    component: ProductCategoryDetailsComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'brain-initiative',
    component: BrainInitiativeComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'distributors',
    component: DistributionComponent
  },
  {
    path: 'science-update-collaboration',
    component: ScienceUpdateCollaborationComponent
  },
  // {
  //   path: 'brain-hacker',
  //   component: BrainHackerComponent
  // },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'support-details/:supportSlug',
    component: SupportDetailsComponent
  },
  {
    path: 'science-details/:scienceSlug',
    component: ScienceDetailsComponent
  },
  {
    path: 'technology',
    component: TechnologyComponent
  },
  {
    path: 'technology-details/:technologySlug',
    component: TechnologyDetailsComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  },
  {
    path: 'testimonial-detail/:slug',
    component: TestimonialDetailsComponent
  },
  {
    path: 'search-result/:searchKeyWord',
    component: SearchResultComponent
  },
  {
    path: 'probe-finder',
    component: ProbeFinderComponent
  },
  {
    path: 'catalogs-brochures',
    component: CatalogsBrochuresComponent
  },
  {
    path: '',
    loadChildren: () => import('./knowledge-center/knowledge-center.module').then((m) => m.KnowledgeCenterModule)
  },
  {
    path: '',
    loadChildren: () => import('./science-update/science-update.module').then((m) => m.ScienceUpdateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
