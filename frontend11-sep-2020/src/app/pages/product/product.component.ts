import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  banner = [];
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  productStaticContent: any;
  productList: any;

  constructor(
    private router: Router,
    private api: ApiService,
  ) {
    this.banner = [];
    this.productStaticContent = undefined;
    this.productList = undefined;
  }

  ngOnInit(): void {
    this.getStaticContent();
    this.getProductList();
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`product/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.productStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'product/' + res.data.header_banner_image,  type: 'image', url: 'product'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
        this.productStaticContent = undefined;
      }
    }, (e) => {
    });
  }
  getProductList() {
    this.api.get(`product/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.productList = res.data;
      } else if (res.status === 201) {
        this.productList = undefined;
      }
    }, (e) => {
    });
  }
  routeToDeatils(productId: any, productSlug: any) {
    this.router.navigate(['/product-details', productSlug]);
  }

}
