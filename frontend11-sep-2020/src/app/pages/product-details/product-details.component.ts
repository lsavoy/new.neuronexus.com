import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  banner = [];
  productDetailsContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  productSlug: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.banner = [];
    this.productDetailsContent = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.productSlug !== undefined) {
        this.productSlug = params.productSlug;
        this.getStaticContent();
        this.getProductDeatils(this.productSlug);
      }
    });
  }


  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'productDetails'};
    // this.banner.push(img);
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
  getProductDeatils(productSlug: any) {
    this.api.get(`product/${productSlug}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.productDetailsContent = res.data;
      } else if (res.status === 201) {
        this.productDetailsContent = undefined;
      }
    }, (e) => {
    });
  }

}
