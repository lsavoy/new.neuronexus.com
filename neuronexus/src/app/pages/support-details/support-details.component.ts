import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.component.html',
  styleUrls: ['./support-details.component.scss']
})
export class SupportDetailsComponent implements OnInit {
  banner = [];
  supportDetailsContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  supportSlug: any;
  safeData: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.banner = [];
    this.supportDetailsContent = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.supportSlug !== undefined) {
      this.supportSlug = params.supportSlug;
      this.getStaticContent();
      this.getSupportDeatils(this.supportSlug);
      }
    });
   }

  ngOnInit(): void {
    const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'supportDetails'};
    this.banner.push(img);
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`support/static`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'support/' + res.data.header_banner_image,  type: 'image', url: 'support'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {

      }
    }, (e) => {
      console.log(e);
    });
  }
  getSupportDeatils(supportId: any) {
    this.api.get(`support/details/${supportId}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.supportDetailsContent = res.data[0];
        this.decodeHtml(this.supportDetailsContent.content);
      } else if (res.status === 201) {
        this.supportDetailsContent = undefined;
      }
    }, (e) => {
      console.log(e);
    });
  }
  getSanitizedData(data: any) {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
  decodeHtml(data: any) {
    const unScapeData = unescape(data);
    this.safeData = this.sanitizer.bypassSecurityTrustHtml(unScapeData);
  }

}
