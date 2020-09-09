import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  banner = [];
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  supportStaticinfo: any;
  constructor(
    private api: ApiService,
  ) {
    this.supportStaticinfo = undefined;
    this.banner = [];
   }

  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'support'};
    // this.banner.push(img);
    this.getStaticContent();
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`support/static`).subscribe((res: any) => {
      if (res.status === 200) {
        this.supportStaticinfo = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'support/' + res.data.header_banner_image,  type: 'image', url: 'support'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
        this.supportStaticinfo = undefined;
      }
    }, (e) => {
      console.log(e);
    });
  }

}
