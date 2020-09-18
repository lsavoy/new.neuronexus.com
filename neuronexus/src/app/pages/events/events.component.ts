import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  banner = [];
  eventList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  p: any = 1;
  pageTitle: any;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.banner = [];
    this.eventList = undefined;
    this.pageTitle = undefined;
   }

  ngOnInit(): void {
    this.getEventStaticContent().then(() => {
      this.getEventList().then(() => {
      });
    });
  }
  getEventStaticContent() {
    const banner = [];
    const promise = new Promise((resolve, reject) => {
      this.api.get(`events/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'events/' + res.data.header_banner_image,  type: 'image'};
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
  getEventList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`events/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.eventList = res.data;
          this.pageTitle = res.page_title;
          this.eventList.forEach(ev => {
            const text = htmlToText.fromString(ev.content, {
              wordwrap: 130
            });
            if(text.length > 200){
              ev.longText = true;
              ev.showFull = false
            }else{
              ev.longText = false;
            }
          })
        } else if (res.status === 201) {
          this.eventList = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
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
    this.eventList.forEach(ele => {
      if(ele._id === ev._id){
        if(ele.longText){
          ele.showFull = !ele.showFull
        }
      }else{
        if(ele.longText){
          ele.showFull = false
        }
      }
    })
  }
}
