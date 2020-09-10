import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  allSettings: any;
  public settings: any = {};
  constructor(
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.getAllSettings();
    this.settings = undefined;
  }
  getAllSettings() {
    this.api.get(`setting/all`).subscribe((res: any) => {
      if (res.status === 200) {
        this.settings = {};
        this.allSettings = res.data;
        this.settings.address = this.allSettings.find(
          e => e.setting_slug === 'neuroNexus-headquarters-address'
        ).setting_value;
        this.settings.phone = this.allSettings.find(
          e => e.setting_slug === 'site-phone'
        ).setting_value;
        this.settings.fax = this.allSettings.find(
          e => e.setting_slug === 'site-fax'
        ).setting_value;
        this.settings.facebook = this.allSettings.find(
          e => e.setting_slug === 'twitter'
        ).setting_value;
        this.settings.youtube = this.allSettings.find(
          e => e.setting_slug === 'youtube'
        ).setting_value;
        this.settings.instagram = this.allSettings.find(
          e => e.setting_slug === 'linkedin'
        ).setting_value;
      } else if (res.status === 201) {
        this.allSettings = undefined;
      }
    }, (e) => {
      console.log(e);
    });
  }
  ngAfterViewInit() {

  }
}
