import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.scss']
})
export class SubCategoryDetailsComponent implements OnInit {
  subCategorySlug: any;
  subCategoryWiseKnowledgeList: any;
  subCategoryName: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subCategoryWiseKnowledgeList = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.subCategorySlug !== undefined) {
      this.subCategorySlug = params.subCategorySlug;
      this.subCategoryName = params.subCategoryName;
      this.getKnowledgeListBySubCategoryId(this.subCategorySlug);
      }
    });
  }

  ngOnInit(): void {
  }
  getKnowledgeListBySubCategoryId(subCategorySlug: any) {
    this.api.get(`knowledgecenter/subcategory/${subCategorySlug}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.subCategoryWiseKnowledgeList = res.data.sort(function(a, b) {
          const aIndex = a.index || 0;
          const bIndex = b.index || 0;
          return aIndex - bIndex;
        });
      } else if (res.status === 201) {
        this.subCategoryWiseKnowledgeList = undefined;
      }
    }, (e) => {
    });
  }

}
