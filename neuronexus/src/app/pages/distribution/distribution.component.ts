import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-distributors',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {
  banner = [];
  distributorsStaticContent: any;
  distributorList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    this.distributorsStaticContent = undefined;
    this.distributorList = undefined;
   }

  ngOnInit(): void {
    this.getAbourtStaticContentforHeaderImage();
    this.getStaticContent();
    this.getDistributorList();
  }
  getAbourtStaticContentforHeaderImage() {
    const banner = [];
    this.api.get(`about/aboutus/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'cms/' + res.data.header_banner_image,  type: 'image', url: 'about'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
      }
    }, (e) => {
    });
  }
  getStaticContent() {
    this.api.get(`about/distributors/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.distributorsStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
        const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'distributors'};
        this.banner.push(img);
        }
      } else if (res.status === 201) {
        this.distributorsStaticContent = undefined;
      }
    }, (e) => {
    });
  }
  getDistributorList() {
    this.api.get(`about/partners/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.distributorList = res.data;
      } else if (res.status === 201) {
        this.distributorList = undefined;
      }
    }, (e) => {
    });
  }

}
