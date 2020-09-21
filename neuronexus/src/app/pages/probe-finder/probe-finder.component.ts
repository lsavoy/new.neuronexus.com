import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-probe-finder',
  templateUrl: './probe-finder.component.html',
  styleUrls: ['./probe-finder.component.scss']
})
export class ProbeFinderComponent implements OnInit {
  banner = [];
  productDetailsContent: any;
  probeFinderMaster: any;
  probFinderList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  public probeData: any = {};

  constructor(
    private api: ApiService
  ) {
    // this.probeFinderMaster = undefined;
    this.probFinderList = undefined;
   }

  ngOnInit(): void {
    this.getStaticContent();
    this.getMasterList();
    this.getProbeFinderList(this.probeData);
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

  getMasterList() {
    this.probeFinderMaster = undefined;
    this.api.get(`probe-finder/master-list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.probeFinderMaster = res;
      } else if (res.status === 201) {
        this.probeFinderMaster = 'no-data';
      }
    }, (e) => {
      this.probeFinderMaster = 'error';
    });
  }
  optionChange(key: any, value: any) {
    this.probeData[key] = value;
    this.getProbeFinderList(this.probeData);
  }
  getProbeFinderList(filterData: any) {
    this.probFinderList = undefined;
    this.api.post(`probe-finder/list`, filterData).subscribe((res: any) => {
      if (res.status === 200) {
        this.probFinderList = res.data;
      } else if (res.status === 201) {
        this.probFinderList = 'no-data';
      }
    }, (e) => {
      this.probFinderList = 'error';
    });
  }

}
