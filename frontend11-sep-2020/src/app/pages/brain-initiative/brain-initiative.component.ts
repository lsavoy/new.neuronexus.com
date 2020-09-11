import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brain-initiative',
  templateUrl: './brain-initiative.component.html',
  styleUrls: ['./brain-initiative.component.scss']
})
export class BrainInitiativeComponent implements OnInit {
  banner = [];
  brainInitiativeStaticContent: any;
  brainInitiativeTabList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    this.brainInitiativeStaticContent = undefined;
    this.brainInitiativeTabList = undefined;
  }

  ngOnInit(): void {
    this.getAbourtStaticContentforHeaderImage();
    this.getStaticContent();
    this.getBrainInitiativeTabList();
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
    this.api.get(`about/brain_initiative/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.brainInitiativeStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'BrainInitiative'};
          this.banner.push(img);
        }
      } else if (res.status === 201) {
        this.brainInitiativeStaticContent = undefined;
      }
    }, (e) => {
    });
  }
  getBrainInitiativeTabList() {
    this.api.get(`about/brain_initiative_tabs/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.brainInitiativeTabList = res.data;
      } else if (res.status === 201) {
        this.brainInitiativeTabList = undefined;
      }
    }, (e) => {
    });
  }

}
