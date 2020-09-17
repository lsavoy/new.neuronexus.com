import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-image-details',
  templateUrl: './video-image-details.component.html',
  styleUrls: ['./video-image-details.component.scss']
})
export class VideoImageDetailsComponent implements OnInit {
  banner = [];
  mediaDetail: any;
  pageSlug: any;
  recordId: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  constructor(private route: ActivatedRoute, private api: ApiService) { 
    this.mediaDetail = undefined;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params){
        if(params.type){
          this.pageSlug = params.type;
          if(params.record){
            this.recordId = params.record;
            this.getMediaDetail();
          }
        }
      }
    })
  }

  getMediaDetail(){
    this.mediaDetail = undefined;
    let api;
    if(this.pageSlug ==='electrode'){
      api = `electrodevideos/${this.recordId}`;
      this.BASE_IMAGE_URL+= 'electrodevideos/';
    }else if(this.pageSlug === 'software'){
      api = `softwarevideos/${this.recordId}`;
      this.BASE_IMAGE_URL+= 'softwarevideos/';
    }else if(this.pageSlug === 'accessories'){
      api = `accessoriesvideos/${this.recordId}`;
      this.BASE_IMAGE_URL+= 'accessoriesvideos/';
    }else if(this.pageSlug === 'training'){
      api = `trainingvideos/${this.recordId}`;
      this.BASE_IMAGE_URL+= 'trainingvideos/';
    }
    this.api.get(api).subscribe((res: any) => {
      if(res.status === 200){
        this.mediaDetail = res.data;
      }
    }, (error) => {

    })
  }
}
