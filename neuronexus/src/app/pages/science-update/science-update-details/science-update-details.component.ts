import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-science-update-details',
  templateUrl: './science-update-details.component.html',
  styleUrls: ['./science-update-details.component.scss']
})
export class ScienceUpdateDetailsComponent implements OnInit {
  banner = [];
  scienceSlug: any;
  scienceItemDetails: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
  ) {
    this.scienceItemDetails = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.scienceSlug !== undefined) {
        this.scienceSlug = params.scienceSlug;
        this.getScienceItemDetails(this.scienceSlug);
      }
    });
  }

  ngOnInit(): void {
  }
  getScienceItemDetails(scienceSlug: any) {
    this.api.get(`science_update/${scienceSlug}`).subscribe((res: any) => {
      if (res.status === 200) {
        // this.scienceItemDetails = res.data[0];
        this.scienceItemDetails = res.data;
      } else if (res.status === 201) {
        this.scienceItemDetails = undefined;
      }
    }, (e) => {
    });
  }

}
