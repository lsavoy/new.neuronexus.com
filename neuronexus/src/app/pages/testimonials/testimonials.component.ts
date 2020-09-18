import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  banner = [];
  testimonials: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  p: any = 1;
  pageTitle: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getScienceUpdateStaticContent().then(()=>{
      this.getTestimonials().then(()=>{})
    })
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

  getTestimonials(){
    this.testimonials = undefined;
    this.pageTitle = undefined;
    const promise = new Promise((resolve, reject) => {
      this.api.get('science_testimonials/list').toPromise().then((res:any) => {
        if(res.status === 200){
          this.testimonials = res.data;
          this.pageTitle = res.page_title;
          this.testimonials.forEach(ele => {
            ele.play = false;
          });
          setTimeout(()=>{
            this.listenToVideoEnd();
          }, 300)
        }
        resolve();
      }, (msg:any) => {
        reject(msg);
      });
    });
    return promise;
  }

  convertTestimonialTitle(title: any) {
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
  convertTestimonialDesc(desc: any) {
    if (desc !== undefined) {
    const text = htmlToText.fromString(desc, {
      wordwrap: 130
    });
    return text.slice(0, 100) + '...';
    }
  }

  playPause(id){
    this.testimonials.forEach(ele => {
      let vid: any =  document.getElementById(`video${ele._id}`);
      if(ele._id === id){
        if(vid){
          if(vid.paused){
            ele.play = true;
            vid.play();
         }else{
           ele.play = false;
           vid.pause();
         }
        }
      }else{
        if(vid){
          ele.play = false
          vid.pause();
        }
      }
    })
  }

  changePage(event){
    this.p = event;
    this.testimonials.forEach(ele => {
      ele.play=false;
    })
    setTimeout(()=> {
      this.listenToVideoEnd()
    },300)
  }

  listenToVideoEnd(){
    this.testimonials.forEach(ele => {
      let vid: any =  document.getElementById(`video${ele._id}`);
      if(vid){
        vid.addEventListener('ended', (e)=>{
          ele.play = false;
      })
      }
    })
  }

}
