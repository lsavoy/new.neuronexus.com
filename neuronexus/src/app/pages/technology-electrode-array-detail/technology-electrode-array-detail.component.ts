import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-technology-electrode-array-detail',
  templateUrl: './technology-electrode-array-detail.component.html',
  styleUrls: ['./technology-electrode-array-detail.component.scss']
})
export class TechnologyElectrodeArrayDetailComponent implements OnInit {
  banner = [];
  techElectrode: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  constructor(private route: ActivatedRoute, private api: ApiService) { 
    this.techElectrode = undefined;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params && params.slug){
        this.getDetail(params.slug);
      }
    })
  }

  getDetail(slug){
    this.techElectrode = undefined;
    this.api.get(`technology_electrode_arrays/details/${slug}`).subscribe((res: any) => {
      if(res.status === 200){
        this.techElectrode = res.data;
      }else{
        this.techElectrode = 'no-data'
      }
    }, (error) => {
      this.techElectrode = 'error';
    })
  }
}
