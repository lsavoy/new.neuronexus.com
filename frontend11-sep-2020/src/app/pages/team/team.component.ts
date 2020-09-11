import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  banner = [];
  teamStaticContent: any;
  leadershipList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    this.teamStaticContent = undefined;
   }

  ngOnInit(): void {
    this.getAbourtStaticContentforHeaderImage();
    this.getStaticContent();
    this.getLeadershipList();
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
    this.api.get(`about/meet-the-team/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.teamStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
        const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'team'};
        this.banner.push(img);
        }
      } else if (res.status === 201) {
        this.teamStaticContent = undefined;
      }
    }, (e) => {
    });
  }
  getLeadershipList() {
    this.api.get(`about/leadership/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.leadershipList = res.data;
      } else if (res.status === 201) {

      }
    }, (e) => {
    });
  }

}
