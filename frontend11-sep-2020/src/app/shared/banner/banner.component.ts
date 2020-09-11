import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnChanges {
  // AfterViewInit
  @Input() banner: any[];
  videoSource: any;
  imageSource: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.imageSource = undefined;
    this.videoSource = undefined;
   }

  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.banner.currentValue.length === 0) {
        this.banner = [];
      } else if (this.banner[0] !== undefined) {
         if (this.banner[0].type === 'video') {
            this.videoSource = this.banner[0].videosrc;
          } else if (this.banner[0].type === 'image') {
            this.imageSource = this.banner[0].imagesrc;
          }
      } else {
        this.banner = [];
      }
    }
  }

}
