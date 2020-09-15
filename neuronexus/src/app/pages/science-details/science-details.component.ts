import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-science-details',
  templateUrl: './science-details.component.html',
  styleUrls: ['./science-details.component.scss']
})
export class ScienceDetailsComponent implements OnInit {
  banner = [];
  scienceDetailsContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  scienceSlug: any;
  safeData: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.banner = [];
    this.scienceDetailsContent = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.scienceSlug !== undefined) {
      this.scienceSlug = params.scienceSlug;
      this.getStaticContent();
      this.getScienceDeatils(this.scienceSlug);
      }
    });
   }

  ngOnInit(): void {
    // const img = {imagesrc: 'assets/images/about_bnr.jpg',  type: 'image', url: 'scienceDetails'};
    // this.banner.push(img);
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`science_update/static`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'science_update/' + res.data.header_banner_image,  type: 'image', url: 'science'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {

      }
    }, (e) => {
    });
  }
  getScienceDeatils(scienceId: any) {
    this.api.get(`science/details/${scienceId}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.scienceDetailsContent = res.data[0];
        this.decodeHtml(this.scienceDetailsContent.content);
      } else if (res.status === 201) {
        this.scienceDetailsContent = undefined;
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
