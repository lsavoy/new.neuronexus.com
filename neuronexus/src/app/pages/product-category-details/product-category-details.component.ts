import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-product-category-details',
  templateUrl: './product-category-details.component.html',
  styleUrls: ['./product-category-details.component.scss']
})
export class ProductCategoryDetailsComponent implements OnInit {
  banner = [];
  categoryDeatils: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  categorySlug: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.banner = [];
    this.categoryDeatils = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.categorySlug !== undefined) {
        this.categorySlug = params.categorySlug;
        this.getStaticContent();
        this.getCategoryDeatils(this.categorySlug);
      }
    });
   }

  ngOnInit(): void {
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`product/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'product/' + res.data.header_banner_image,  type: 'image', url: 'product'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
      }
    }, (e) => {
    });
  }
  getCategoryDeatils(productSlug: any) {
    this.api.get(`product/list/category`).subscribe((res: any) => {
      if (res.status === 200) {
        if (_.findWhere(res.data, {slug: productSlug}) !== undefined) {
          this.categoryDeatils =  _.findWhere(res.data, {slug: productSlug});
        } else {
          this.categoryDeatils = undefined;
        }
      } else if (res.status === 201) {
        this.categoryDeatils = undefined;
      }
    }, (e) => {
    });
  }
  routeToDeatils(productSlug: any) {
    this.router.navigate(['/product-details', productSlug]);
  }

}
