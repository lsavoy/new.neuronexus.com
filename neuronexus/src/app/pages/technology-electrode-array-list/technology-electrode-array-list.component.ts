import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';

@Component({
  selector: 'app-technology-electrode-array-list',
  templateUrl: './technology-electrode-array-list.component.html',
  styleUrls: ['./technology-electrode-array-list.component.scss']
})
export class TechnologyElectrodeArrayListComponent implements OnInit {
  banner = [];
  electrodeArrayList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  p: any = 1;
  pageTitle: any;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.banner = [];
   }

  ngOnInit(): void {
    this.getTechnologyStaticContent().then(() => {
      this.getElectrodeArrayList().then(() => {
      });
    });
  }
  getTechnologyStaticContent() {
    const banner = [];
    const promise = new Promise((resolve, reject) => {
      this.api.get(`technology/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'technology/' + res.data.header_banner_image,  type: 'image'};
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
  getElectrodeArrayList() {
    this.electrodeArrayList = undefined;
    this.pageTitle = undefined;
    const promise = new Promise((resolve, reject) => {
      this.api.get(`technology_electrode_arrays/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.electrodeArrayList = res.data;
          this.pageTitle = res.page_title;
        } else if (res.status === 201) {
          this.electrodeArrayList = 'no-data';
        }
        resolve();
        },
        (msg: any) => {
          this.electrodeArrayList = 'error';
          reject(msg);
        });
    });
    return promise;
  }
  convertTitle(title: any) {
    if (title !== undefined) {
      const text = htmlToText.fromString(title, {
        wordwrap: 130
      });
      if(text.length > 68){
        return text.slice(0, 68) + '...';;
      }else{
        return text;
      }
    }
  }
  convertDesc(desc: any) {
    if (desc !== undefined) {
    const text = htmlToText.fromString(desc, {
      wordwrap: 130
    });
    return text.slice(0, 100) + '...';
    }
  }

}
