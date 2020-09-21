import { Component, OnInit } from '@angular/core';
import * as htmlToText from 'html-to-text';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support-blog',
  templateUrl: './support-blog.component.html',
  styleUrls: ['./support-blog.component.scss']
})
export class SupportBlogComponent implements OnInit {
  banner = [];
  blogList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  p: any = 1;
  pageTitle: any;

  constructor(
    private api: ApiService,
  ) {
    this.banner = [];
    this.blogList = undefined;
    this.pageTitle = undefined;
   }

  ngOnInit(): void {
    this.getSupportStaticContent().then(() => {
      this.getBlogList().then(() => {
      });
    });
  }
  getSupportStaticContent() {
    const banner = [];
    const promise = new Promise((resolve, reject) => {
      this.api.get(`support/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'support/' + res.data.header_banner_image,  type: 'image'};
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
  getBlogList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`support_blog/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.blogList = res.data;
          this.pageTitle = res.page_title
          this.blogList.forEach(ev => {
            ev.showFull = false;
          })
        } else if (res.status === 201) {
          this.blogList = 'no-data';
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
          this.blogList = 'error'
        });
    });
    return promise;
  }
  convertDesc(desc: any) {
    if (desc !== undefined) {
    const text = htmlToText.fromString(desc, {
      wordwrap: 130
    });
    return text.slice(0, 200) + '...';
    }
  }

  showLessMore(ev){
    this.blogList.forEach(ele => {
      if(ele._id === ev._id){
        ele.showFull = !ele.showFull
      }else{
        ele.showFull = false
      }
    })
  }
}
