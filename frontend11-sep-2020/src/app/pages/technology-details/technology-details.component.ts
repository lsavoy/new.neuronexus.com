import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit {
  banner = [];
  technologyDetailsContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  technologySlug: any;
  safeData: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.banner = [];
    this.technologyDetailsContent = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.technologySlug !== undefined) {
      this.technologySlug = params.technologySlug;
      this.getStaticContent();
      this.getTechnologyDetails(this.technologySlug);
      }
    });
   }

  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'technologyDetails'};
    // this.banner.push(img);
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`technology/static`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'technology/' + res.data.header_banner_image,  type: 'image', url: 'technology'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {

      }
    }, (e) => {
    });
  }
  getTechnologyDetails(technologyId: any) {
    this.api.get(`technology/details/${technologyId}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.technologyDetailsContent = res.data[0];
        this.decodeHtml(this.technologyDetailsContent.content);
      } else if (res.status === 201) {
        this.technologyDetailsContent = undefined;
      }
    }, (e) => {
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
