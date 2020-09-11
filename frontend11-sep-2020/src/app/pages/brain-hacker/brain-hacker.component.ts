import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brain-hacker',
  templateUrl: './brain-hacker.component.html',
  styleUrls: ['./brain-hacker.component.scss']
})
export class BrainHackerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }


}
