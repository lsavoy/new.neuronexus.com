import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial-details',
  templateUrl: './testimonial-details.component.html',
  styleUrls: ['./testimonial-details.component.scss']
})
export class TestimonialDetailsComponent implements OnInit {
  banner = [];
  testimonial: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.slug){
        this.getTestimonialDetail(params.slug);
      }
    })
  }

  getTestimonialDetail(slug){
    this.testimonial = undefined
    this.api.get(`science_testimonials/${slug}`).subscribe((res: any) => {
      if(res.status === 200){
        this.testimonial = res.data;
      }
    }, (error) => {

    })
  }

}
