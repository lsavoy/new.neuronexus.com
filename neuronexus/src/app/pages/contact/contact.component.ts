import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  banner = [];
  form: FormGroup;
  @ViewChild('ContactForm', { static: true }) public contactForm: any;
  allSettings: any;
  public settings: any = {};
  contactStaticContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
    private formService: FormService,
  ) {
    // this.allSettings = undefined;
    // this.settings = undefined;
    // this.contactStaticContent = undefined;
    this.banner = [];
   }

  ngOnInit(): void {
    this.form = this.formService.formInit(this.contactForm);
    this.getStaticContent();
    this.getAllSettings();
  }
  getStaticContent() {
    this.contactStaticContent = undefined;
    const banner = [];
    this.api.get(`contact/staticinfo`).subscribe((res: any) => {
      if (res.status === 200) {
        this.contactStaticContent = res.data;
        if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
        const img = {imagesrc: this.BASE_IMAGE_URL + 'cms/' + res.data.header_banner_image,  type: 'image', url: 'contact'};
        banner.push(img);
        this.banner = banner;
        }
      } else if (res.status === 201) {
        this.contactStaticContent = 'no-data';
      }
    }, (e) => {
      this.contactStaticContent = 'error';
    });
  }
  getAllSettings() {
    this.allSettings = undefined;
    this.settings = undefined;
    this.api.get(`setting/all`).subscribe((res: any) => {
      if (res.status === 200) {
        this.settings = {};
        this.allSettings = res.data;
        this.settings.addressTitle = this.allSettings.find(
          e => e.setting_slug === 'neuroNexus-headquarters-address'
        ).setting_name;
        this.settings.address = this.allSettings.find(
          e => e.setting_slug === 'neuroNexus-headquarters-address'
        ).setting_value;
        this.settings.phone = this.allSettings.find(
          e => e.setting_slug === 'site-phone'
        ).setting_value;
        this.settings.fax = this.allSettings.find(
          e => e.setting_slug === 'site-fax'
        ).setting_value;
        this.settings.sales = this.allSettings.find(
          e => e.setting_slug === 'site-sales'
        ).setting_value;
        this.settings.support = this.allSettings.find(
          e => e.setting_slug === 'site-support'
        ).setting_value;
        this.settings.officeOpenForm = this.allSettings.find(
          e => e.setting_slug === 'offices-are-open-from'
        ).setting_value;
      } else if (res.status === 201) {
        this.allSettings = 'no-data';
        this.settings = 'no-data';
      }
    }, (e) => {
      this.allSettings = 'error';
      this.settings = 'error';
    });
  }

  submit() {
    if (this.form.valid) {
      this.api.post('contactus/form/save', this.form.value).subscribe((res: any) => {
        if (res.status === 200) {
          this.api.alert(res.message, 'success');
          this.form.reset();
        } else {
          this.api.alert(res.message, 'error');
        }

      }, err => {
        this.api.alert(err.message, 'error');
      });
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key).markAsTouched();
      });
    }
  }

}
