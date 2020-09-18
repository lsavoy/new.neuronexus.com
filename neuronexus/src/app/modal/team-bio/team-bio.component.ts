import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-bio',
  templateUrl: './team-bio.component.html',
  styleUrls: ['./team-bio.component.scss']
})
export class TeamBioComponent implements OnInit {
  member: any = undefined;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.member = this.data.member;
  }

}
