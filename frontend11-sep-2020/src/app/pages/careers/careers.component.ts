import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  banner = [];
  careerStaticContent: any;
  careersOpeningList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
  }

  ngOnInit(): void {
    this.getAbourtStaticContentforHeaderImage();
    this.getStaticContent();
    this.getCareersOpeningList();
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
    this.api.get(`about/careers/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.careerStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '' ) {
          const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'careers'};
          this.banner.push(img);
        }
      } else if (res.status === 201) {
        this.careerStaticContent = undefined;
      }
    }, (e) => {
    });
  }
  getCareersOpeningList() {
    this.api.get(`about/careers_opening/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.careersOpeningList = res.data;
      } else if (res.status === 201) {
        this.careersOpeningList = undefined;
      }
    }, (e) => {
    });
  }

}
