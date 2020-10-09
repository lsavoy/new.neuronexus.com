import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';
import * as htmlToText from 'html-to-text';
import * as _ from 'underscore';
import { MatDialog } from '@angular/material/dialog';
import { DefaultComponent } from 'src/app/modal';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  width: any;
  height: any;
  particleStyle: any;
  particleParams: any;
  homeSlideConfig: any;
  knowledgeCenterList: any;
  scienceUpdateList: any;
  supportList: any;
  supportList1: any;
  supportList2: any;
  supportStaticinfo: any;
  aboutStaticContent: any;
  featureJumpUrl: any;
  featureList: any;
  postList: any;
  imageSlideList: any;
  imageSlideConfig: any;
  sliderConfig: any;
  videoSlideList: any;
  videoSlideConfig: any;
  slideList: any;
  video: any;
  allSettings: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;


  constructor(
    private api: ApiService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.width = 100;
    this.height = 100;
    this.particleStyle = undefined;
    this.particleParams = undefined;
    this.homeSlideConfig = undefined;
    this.knowledgeCenterList = undefined;
    this.aboutStaticContent = undefined;
    this.scienceUpdateList = undefined;
    this.supportList = undefined;
    this.supportStaticinfo = undefined;
    this.slideList = undefined;
    this.video = undefined;
    this.imageSlideList = undefined;
    this.imageSlideConfig = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 3000,
      autoplay: true
    };
    this.videoSlideList = undefined;
    this.videoSlideConfig = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      autoplay: true
    };
    this.sliderConfig = {
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      autoplay: true
    };
   }
  ngAfterViewInit(): void {
    this.particleStyle = this.eventService.particleStyle;
    this.particleParams = this.eventService.particleParams;
    this.homeSlideConfig = this.eventService.homeSlideConfig;
    this.cdr.detectChanges();

    // this.getAllSettingsForOfferModal().then(() => {
    //   this.getVideo().then(() => {
    //     this.getSlide().then(() => {
    //       this.getSupportStaticContent().then(() => {
    //         this.getSupportList().then(() => {
    //           this.getScienceUpdateList().then(() => {
    //             this.getKnowledgeCenterList().then(() => {
    //               this.getFeatureInfo().then(() => {
    //                 this.getPostList().then(() => {
    //                   this.getImageSlideList().then(()=> {
    //                     this.getVideoSlideList().then(()=> {
    //                     })
    //                   })
    //                 })
    //               })
    //             });
    //           });
    //         });
    //       });
    //     });
    //   });
    // });

    this.getAllSettingsForOfferModal().then(() => {
      this.getVideo().then(() => {
        this.getSlide().then(() => {
          this.getFeatureInfo().then(() => {
            this.getPostList().then(() => {
              this.getImageSlideList().then(() => {
                this.getVideoSlideList().then(() => {
                  this.getScienceUpdateList().then(() => {
                    this.getKnowledgeCenterList().then(() => {

                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  ngOnInit(): void {
  }
  getAllSettingsForOfferModal() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`setting/all`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.allSettings = res.data;
          this.allSettings.map((item: any) => {
            if (item.setting_slug === 'welcome_notification_message') {
              this.openOfferModal('1', item.setting_value);
            }
            if (item.setting_slug === 'product-feature-jump-url') {
              this.featureJumpUrl = item.setting_value;
            }
          });
        } else if (res.status === 201) {
          this.allSettings = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getVideo() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`slider/video`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.video = this.BASE_IMAGE_URL + 'slider/' + res.data.slider_video;
        } else if (res.status === 201) {
          this.video = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getSlide() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`slider/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.slideList = res.data;
        } else if (res.status === 201) {
          this.slideList = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getSupportStaticContent() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`support/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
        this.supportStaticinfo = res.data;
        } else if (res.status === 201) {
          this.supportStaticinfo = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getSupportList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`support/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.supportList = _.filter (res.data, (item: any ) => {
            return item.isHome === true;
          });
          this.supportList = _.chunk(this.supportList, 2);
          this.supportList1 = this.supportList[0];
          this.supportList2 = this.supportList[1];
        } else if (res.status === 201) {
          this.supportList = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  getAboutUsContent() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`about/aboutus/staticinfo`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.aboutStaticContent = res.data;
        } else if (res.status === 201) {
          this.aboutStaticContent = undefined;
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
      this.api.get(`science_update/topthree`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.scienceUpdateList = res.data;
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
  getKnowledgeCenterList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`knowledgecenter/topfive`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.knowledgeCenterList = res.data;
        } else if (res.status === 201) {
          this.knowledgeCenterList = undefined;
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

  formatSupportTitle(title: any) {
    const arr = title.split(' ');
    const temp = arr.slice(1, arr.length );
    const tempString = temp.join(' ');
    const finalarr = [];
    finalarr.push(arr[0]);
    finalarr.push(tempString);
    return finalarr;
  }
  openOfferModal(modalType: any, Offercontent: any) {
    this.dialog.open(DefaultComponent, {
      data: { type: modalType, content : Offercontent }
    });
  }
  getFeatureInfo() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`product-feature/all`).toPromise().then((res: any) => {
            if (res.status === 200) {
              this.featureList = res.data.sort(function(a, b) {
                return a.feature_index - b.feature_index;
              });
            } else if (res.status === 201) {
              this.featureList = undefined;
            }
            resolve();
          },
          (msg: any) => {
            reject(msg);
          });
    });
    return promise;
  }
  getPostList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`top-blog/all`).toPromise().then((res: any) => {
            if (res.status === 200) {
              this.postList = res.data.sort(function(a, b) {
                return a.blog_index - b.blog_index;
              });
            } else if (res.status === 201) {
              this.postList = undefined;
            }
            resolve();
          },
          (msg: any) => {
            reject(msg);
          });
    });
    return promise;
  }
  getImageSlideList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`image-carousel/all`).toPromise().then((res: any) => {
            if (res.status === 200) {
              this.imageSlideList = res.data.sort(function(a, b) {
                return a.carousel_index - b.carousel_index;
              });
            } else if (res.status === 201) {
              this.imageSlideList = undefined;
            }
            resolve();
          },
          (msg: any) => {
            reject(msg);
          });
    });
    return promise;
  }
  getVideoSlideList() {
    const promise = new Promise((resolve, reject) => {
      var _this = this;
      this.api.get(`video-carousel/all`).toPromise().then((res: any) => {
            if (res.status === 200) {
              res.data.forEach(function(item, index) {
                item.videoUrl = _this.trustUrl(item.video_url);
              });
              this.videoSlideList = res.data.sort(function(a, b) {
                return a.carousel_index - b.carousel_index;
              });
            } else if (res.status === 201) {
              this.videoSlideList = undefined;
            }
            resolve();
          },
          (msg: any) => {
            reject(msg);
          });
    });
    return promise;
  }

  trustUrl(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
