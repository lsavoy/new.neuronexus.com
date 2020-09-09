import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  modalData: any;
  popUpContent: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.modalData = data;
    this.decodeHtml(this.modalData.content);
  }

  ngOnInit(): void {
  }
  decodeHtml(data: any) {
    const unScapeData = unescape(data);
    this.popUpContent = this.sanitizer.bypassSecurityTrustHtml(unScapeData);
  }


}
