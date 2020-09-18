import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-image-list',
  templateUrl: './video-image-list.component.html',
  styleUrls: ['./video-image-list.component.scss']
})
export class VideoImageListComponent implements OnInit {
  banner = [];
  list: any;
  pageSlug: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  p: any = 1;
  pageTitle: any;
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.list = undefined;
      this.pageTitle = undefined
      if(param && param.type){
        this.pageSlug = param.type;
        this.p = 1;
        this.BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
        this.getStaticContent().then(()=>{
          this.getImageVideoLists().then(()=>{})
        })
      }
    })
  }

  getStaticContent() {
    const banner = [];
    let api;
    let path;
    if(this.pageSlug === 'electrode' || this.pageSlug === 'software' || this.pageSlug === 'accessories'){
      api = 'product/staticinfo'
      path = 'product/'
    }else if(this.pageSlug === 'training'){
      api = "support/static"
      path = 'support/'
    }
    const promise = new Promise((resolve, reject) => {
      this.api.get(api).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + path + res.data.header_banner_image,  type: 'image'};
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

  getImageVideoLists(){
    let api;
    if(this.pageSlug === 'electrode'){
      api = 'electrodevideos/list';
      this.BASE_IMAGE_URL+='electrodevideos/'
    }else if(this.pageSlug === 'software'){
      api = 'softwarevideos/list';
      this.BASE_IMAGE_URL+='softwarevideos/'
    }else if(this.pageSlug === 'accessories'){
      api = 'accessoriesvideos/list';
      this.BASE_IMAGE_URL+='accessoriesvideos/'
    }else if(this.pageSlug === 'training'){
      api = 'trainingvideos/list';
      this.BASE_IMAGE_URL+='trainingvideos/'
    }
    const promise = new Promise((resolve, reject) => {
      this.api.get(api).toPromise().then((res:any) => {
        if(res.status === 200){
          this.list = res.data;
          this.pageTitle = res.page_title;
          this.list.forEach(ele => {
            if(ele.type === 'video'){
              ele.play = false;
            }
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

  playPause(id){
    this.list.forEach(ele => {
      if(ele.type === 'video'){
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
      }
    })
  }

  changePage(event){
    this.p = event;
    this.list.forEach(ele => {
      ele.play=false;
    })
    setTimeout(()=> {
      this.listenToVideoEnd()
    },300)
  }

  listenToVideoEnd(){
    this.list.forEach(ele => {
      if(ele.type === 'video'){
        let vid: any =  document.getElementById(`video${ele._id}`);
        if(vid){
          vid.addEventListener('ended', (e)=>{
            ele.play = false;
        })
        }
      }
    })
  }

}
