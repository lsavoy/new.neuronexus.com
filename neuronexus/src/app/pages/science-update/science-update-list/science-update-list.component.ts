import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';


@Component({
  selector: 'app-science-update-list',
  templateUrl: './science-update-list.component.html',
  styleUrls: ['./science-update-list.component.scss']
})
export class ScienceUpdateListComponent implements OnInit {
  banner = [];
  scienceUpdateList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  pageTitle: any;
  p: any = 1;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.banner = [];
    this.scienceUpdateList = undefined;
    this.pageTitle = undefined;
   }

  ngOnInit(): void {
    this.getScienceUpdateStaticContent().then(() => {
      this.getScienceUpdateList().then(() => {
      });
    });
  }
  getScienceUpdateStaticContent() {
    const banner = [];
    const promise = new Promise((resolve, reject) => {
      this.api.get(`science_update/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'science_update/' + res.data.header_banner_image,  type: 'image', url: 'product'};
            banner.push(img);
            this.banner = banner;
          }
        } else if (res.status === 201) {
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getScienceUpdateList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`science_update/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.scienceUpdateList = res.data;
          this.pageTitle = res.page_title
        } else if (res.status === 201) {
          this.scienceUpdateList = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  convertScienceUpdateTitle(title: any) {
    if (title !== undefined) {
    const text = htmlToText.fromString(title, {
      wordwrap: 130
    });
    return text.slice(0, 68) + '...';
    }
  }
  convertScienceUpdateDesc(desc: any) {
    if (desc !== undefined) {
    const text = htmlToText.fromString(desc, {
      wordwrap: 130
    });
    return text.slice(0, 100) + '...';
    }
  }

}
