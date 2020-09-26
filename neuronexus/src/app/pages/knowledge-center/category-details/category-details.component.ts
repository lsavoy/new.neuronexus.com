import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  categorySlug: any;
  categoryWiseKnowledgeList: any;
  categoryWiseSubCategoryList: any;
  categoryName: any;



  constructor(
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.categoryWiseKnowledgeList = undefined;
    this.categoryWiseSubCategoryList = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.categorySlug !== undefined) {
        this.categorySlug = params.categorySlug;
        this.categoryName = params.categoryName;
        this.getKnowledgeListByCategoryId(this.categorySlug);
      }
    });
  }

  ngOnInit(): void {
  }

  getKnowledgeListByCategoryId(categorySlug: any) {
    this.api.get(`knowledgecenter/category/${categorySlug}`).subscribe((res: any) => {
      if (res.status === 200) {
        this.categoryWiseKnowledgeList = res.data.sort(function(a, b) {
          const aIndex = a.index || 0;
          const bIndex = b.index || 0;
          return aIndex - bIndex;
        });
        if (categorySlug !== undefined) {
          this.createCategoryWiseSubcategoryList(this.categoryWiseKnowledgeList, categorySlug);
        }
      } else if (res.status === 201) {
        this.categoryWiseKnowledgeList = undefined;
      }
    }, (e) => {
    });
  }
  createCategoryWiseSubcategoryList(knowledgeList: any, categorySlug: any) {
    this.categoryWiseSubCategoryList = [];
    const tempCatWiseSubList = [];
    knowledgeList.map((item: any) => {
      if (item.category_slug === categorySlug) {
        const subCategory = {
          slug: item.sub_category_slug,
          sub_category_id: item.sub_category_id,
          sub_category_name : item.sub_category_name
        };
        tempCatWiseSubList.push(subCategory);
        }
      });
    // for unique value
    const key = 'sub_category_id';
    const arrayUniqueByKey = [...new Map(tempCatWiseSubList.map(item =>
      [item[key], item])).values()];
    this.categoryWiseSubCategoryList = arrayUniqueByKey;
  }

}
