import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {
  banner = [];
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  technologyStaticinfo: any;
  constructor(
    private api: ApiService,
  ) {
    this.technologyStaticinfo = undefined;
    this.banner = [];
   }

  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'support'};
    // this.banner.push(img);
    this.getStaticContent();
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`technology/static`).subscribe((res: any) => {
      if (res.status === 200) {
        this.technologyStaticinfo = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'technology/' + res.data.header_banner_image,  type: 'image', url: 'technology'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
        this.technologyStaticinfo = undefined;
      }
    }, (e) => {
    });
  }

}
