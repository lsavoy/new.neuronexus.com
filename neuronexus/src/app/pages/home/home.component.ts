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
  featureInfo: any;
  featureList: any;
  postList: any;
  imageSlideList: any;
  imageSlideConfig: any;
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
        this.getFeatureInfo().then(() => {
          this.getPostList().then(() => {
            this.getImageSlideList().then(()=> {
              this.getVideoSlideList().then(()=> {
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
    const promise = new Promise((resolve, reject)=>{
      const data = {
        jumpUrl: 'https://www.baidu.com',
        featureList: [
          {
            image: 'test_feature_01.jpeg',
            caption: 'unprecedented <br/> and time expansion',
            description: 'In this unprecedented and challenging time, NeuroNexus would like to extend our well-wishes to you and your team, as well as your families and loved ones'
          },
          {
            image: 'test_feature_02.png',
            caption: 'In addition to the great personal',
            description: 'In addition to the great personal harm the COVID-19 outbreak is causing to so many, we understand that it is also disrupting many research programs'
          },
          {
            image: 'test_feature_03.jpeg',
            caption: 'While most of our administrative',
            description: 'While most of our administrative and technical advisement staff will be working from home like so many of yourselves, we are all maintaining our normal'
          }
        ]
      };
      this.featureInfo = data;
      this.featureList = data.featureList;
      resolve();
    })

    return promise;
  }
  getPostList() {
    const promise = new Promise((resolve, reject)=> {
      const data = [
        {
          title: '<a href="https://neuronexus.com/2020/08/13/neuronexus-stories-with-dr-gyorgy-buzsaki/"><strong>NeuroNexus Stories with Dr. György Buzsáki</strong></a>',
          summary: 'Dr. Buzsáki’s interview is part of our ongoing series,&nbsp;<a href="https://www.youtube.com/playlist?list=PLW7Scgg9PhRazK78U5mwXLhYxq6r-Qpov">NeuroNexus Stories</a>, which features prominent scientists whose work is invaluable to the neuroscience community and us here at NeuroNexus. These exclusive interviews with the brilliant minds in our network show the collaboration in play as we develop the future of neurotechnology together. Find the NeuroNexus Stories playlist&nbsp;<a href="https://www.youtube.com/playlist?list=PLW7Scgg9PhRazK78U5mwXLhYxq6r-Qpov">here</a>&nbsp;to watch our past videos.',
          resource: 'test_post_01.jpg',
          resourceType: 'img',
          jumpUrl: 'https://neuronexus.com/2020/08/27/dr-rio-vetter-webinar-electrode-technology/'
        },
        {
          title: '<a href="https://neuronexus.com/2020/08/27/dr-rio-vetter-webinar-electrode-technology/"><strong>New Webinar in NeuroNexus Series</strong></a>',
          summary: 'Dr. Vetter, a co-founder of NeuroNexus, leads our recent webinar discussing our microelectrode technology. During this exclusive walkthrough with Dr. Vetter, viewers will learn a historical overview of microelectrodes followed by a detailed description of our innovative MEMS-based electrode technology and product lines, finishing up with some unique and interesting applications that utilize this technology and its capabilities. ',
          resource: 'video3.mp4',
          resourceType: 'viedo',
          jumpUrl: 'https://neuronexus.com/2020/08/27/dr-rio-vetter-webinar-electrode-technology/'
        },
        {
          title: '<strong>Science Update: <a href="https://advances.sciencemag.org/content/6/24/eaba1430">GABAergic interneurons excite neonatal hippocampus in vivo</a></strong>',
          summary: 'Murata and Colonnese (Science Advances, 2020)&nbsp;used several 32-channel NeuroNexus probe designs with close, intermediate, and sparse electrode site layouts to record depth EEG and multiunit activity in neonatal mouse hippocampus and visual cortex. They present definitive <em>in vivo</em> results that GABAergic interneurons in hippocampus are excitatory at P3, but become inhibitory by P7.',
          resource: 'space_cover.jpg',
          resourceType: 'img',
          jumpUrl: 'https://advances.sciencemag.org/content/6/24/eaba1430'
        }
      ]
      this.postList = data;
      resolve();
    });
    return promise;
  }
  getImageSlideList() {
    const promise = new Promise((resolve, reject)=> {
      const imageSlideList = [
        {
          img: 'test_image_01.jpg',
          jumpUrl: 'https://www.baidu.com'
        },
        {
          img: 'test_image_02.jpeg',
          jumpUrl: 'https://www.jd.com'
        },
        {
          img: 'test_image_03.jpg',
          jumpUrl: 'https://www.taobao.com'
        },
        {
          img: 'test_image_04.jpeg',
          jumpUrl: 'https://news.163.com'
        }
      ];
      this.imageSlideList = imageSlideList;
      resolve();
    });
    return promise;
  }
  // https://player.youku.com/embed/XMzgzODEzMTQ0NA==
  // https://player.youku.com/embed/XNDc2MTY0NTIzMg==
  // https://player.youku.com/embed/XNDg0MDUyNjM2MA==
  getVideoSlideList() {
    const promise = new Promise((resolve, reject) => {
      const videoSlideList = [
        {
          videoUrl: this.trustUrl('https://www.youtube.com/embed/Gkmcyr3E6sg?feature=oembed')
        },
        {
          videoUrl: this.trustUrl('https://www.youtube.com/embed/GxY5PJyuJeU?feature=oembed')
        }
      ];
      this.videoSlideList = videoSlideList;
      resolve();
    });
    return promise;
  }

  trustUrl(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
