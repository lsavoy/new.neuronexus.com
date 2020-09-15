import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  banner = [];
  aboutStaticContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  constructor(
    private api: ApiService,
  ) {
    this.aboutStaticContent = undefined;
    this.banner = [];
  }

  ngOnInit(): void {
    this.getStaticContent();
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`about/aboutus/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.aboutStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'cms/' + res.data.header_banner_image,  type: 'image', url: 'about'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
        this.aboutStaticContent = undefined;
      }
    }, (e) => {
    });
  }

}
