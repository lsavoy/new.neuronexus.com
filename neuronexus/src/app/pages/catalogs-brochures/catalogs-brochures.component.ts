import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-catalogs-brochures',
  templateUrl: './catalogs-brochures.component.html',
  styleUrls: ['./catalogs-brochures.component.scss']
})
export class CatalogsBrochuresComponent implements OnInit {
  banner = [];
  catlogAndBrouchers: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  pageTitle: any;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    // this.catlogAndBrouchers = undefined;
    // this.pageTitle = undefined;
  }

  ngOnInit(): void {
    this.getStaticContent();
    this.getCatlogAndBrochursData();
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`product/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = { imagesrc: this.BASE_IMAGE_URL + 'product/' + res.data.header_banner_image, type: 'image', url: 'product' };
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
      }
    }, (e) => {
    });
  }
  getCatlogAndBrochursData() {
    this.catlogAndBrouchers = undefined;
    this.pageTitle = undefined;
    this.api.get(`catalogs/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.catlogAndBrouchers = res.data;
        this.pageTitle = res.page_title;
      } else if (res.status === 201) {
        this.catlogAndBrouchers = 'no-data';
        this.pageTitle = 'no-data';
      }
    }, (e) => {
      this.catlogAndBrouchers = 'error';
      this.pageTitle = 'error';
    });
  }

}
