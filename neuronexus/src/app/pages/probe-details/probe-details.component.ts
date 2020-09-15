import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DefaultComponent } from 'src/app/modal';

@Component({
  selector: 'app-probe-details',
  templateUrl: './probe-details.component.html',
  styleUrls: ['./probe-details.component.scss']
})
export class ProbeDetailsComponent implements OnInit {
  banner = [];
  probDetailsContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  probeSlug: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.banner = [];
    this.probDetailsContent = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.probeSlug !== undefined) {
        this.probeSlug = params.probeSlug;
        this.getStaticContent();
        this.getProbDeatils(this.probeSlug);
      }
    });
   }

  ngOnInit(): void {
  }
  getStaticContent() {
    const banner = [];
    this.api.get(`product/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: this.BASE_IMAGE_URL + 'product/' + res.data.header_banner_image,  type: 'image', url: 'product'};
          banner.push(img);
          this.banner = banner;
        }
      } else if (res.status === 201) {
      }
    }, (e) => {
    });
  }
  getProbDeatils(probeSlug: any) {
    this.api.get(`probe-finder/details/${probeSlug}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.probDetailsContent = res.data;
      } else if (res.status === 201) {
        this.probDetailsContent = undefined;
      }
    }, (e) => {
    });
  }
  openImageModal(image: any) {
    this.openOfferModal('2', image);
  }
  openOfferModal(modalType: any, image: any) {
    this.dialog.open(DefaultComponent, {
      data: { type: modalType, content : image }
    });
  }
}
