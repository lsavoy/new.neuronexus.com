import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-science-update-collaboration',
  templateUrl: './science-update-collaboration.component.html',
  styleUrls: ['./science-update-collaboration.component.scss']
})
export class ScienceUpdateCollaborationComponent implements OnInit {
  banner = [];
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  scienceUpdateCollaborationStaticinfo: any;
  scienceUpdateCollaborationList: any;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    // this.scienceUpdateCollaborationStaticinfo = undefined;
    // this.scienceUpdateCollaborationList = undefined;
   }

  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'scienceUpdateCollaboration'};
    // this.banner.push(img);
    this.getAbourtStaticContentforHeaderImage();
    this.getStaticContent();
    this.getScienceUpdateCollaborationLst();
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
    this.scienceUpdateCollaborationStaticinfo = undefined;
    this.api.get(`about/science_update_collaboration/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.scienceUpdateCollaborationStaticinfo = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
        const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'scienceUpdateCollaboration'};
        this.banner.push(img);
        }
      } else if (res.status === 201) {
        this.scienceUpdateCollaborationStaticinfo = 'no-data';
      }
    }, (e) => {
      this.scienceUpdateCollaborationStaticinfo = 'error';
    });
  }
  getScienceUpdateCollaborationLst() {
    this.scienceUpdateCollaborationList = undefined;
    this.api.get(`about/science_update_collaboration_tabs/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.scienceUpdateCollaborationList = res.data;
      } else if (res.status === 201) {
        this.scienceUpdateCollaborationList = 'no-data';
      }
    }, (e) => {
      this.scienceUpdateCollaborationList = 'error';
    });
  }

}
