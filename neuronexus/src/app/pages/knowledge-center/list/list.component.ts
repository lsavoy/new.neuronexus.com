import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  knowledgeList: any;
  categoryList: any;
  knowledgeForm: FormGroup;
  @ViewChild('seacrhKnowledgeForm', { static: true }) public SeacrhKnowledgeForm: any;
  showKnowledgeCategory = true;
  showClear = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formService: FormService,
  ) {
    this.knowledgeList = undefined;
    this.categoryList = undefined;
  }

  ngOnInit(): void {
    this.knowledgeForm = this.formService.formInit(this.SeacrhKnowledgeForm);
    this.getKnowledgeCenterList().then(() => {
    });
  }
  getKnowledgeCenterList() {
    const promise = new Promise((resolve, reject) => {
      this.api.get(`knowledgecenter/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.knowledgeList = res.data;
          this.createCategoryList(this.knowledgeList);
        } else if (res.status === 201) {
          this.knowledgeList = undefined;
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  createCategoryList(knowledgeList: any) {
    this.categoryList = [];
    const tempCategory = [];
    knowledgeList.map((item: any) => {
      const category = {
        slug: item.category_slug,
        category_id: item.category_id,
        category_name : item.category_name
      };
      tempCategory.push(category);
    });
    // for unique value
    const key = 'category_id';
    const arrayUniqueByKey = [...new Map(tempCategory.map(item =>
      [item[key], item])).values()];
    this.categoryList = arrayUniqueByKey;
  }
  searchForKnowledge() {
    if (this.knowledgeForm.valid) {
      this.showKnowledgeCategory = false;
      this.showClear = true;
      const opts = { params: new HttpParams({ fromString: `title=${this.knowledgeForm.value.knowledgeKeyword}` }) };
      this.api.get(`knowledgecenter/list`, opts.params).subscribe((res: any) => {
        if (res.status === 200) {
          this.knowledgeList = res.data;
        } else if (res.status === 201) {
          this.knowledgeList = undefined;
        }
      }, (e) => {
        console.log(e);
      });
    } else {
      Object.keys(this.knowledgeForm.controls).forEach((key) => {
        this.knowledgeForm.get(key).markAsTouched();
      });
    }
  }
  clearSeacrch() {
    this.knowledgeForm.reset();
    this.showKnowledgeCategory = true;
    this.showClear = false;
    this.knowledgeForm = this.formService.formInit(this.SeacrhKnowledgeForm);
    this.getKnowledgeCenterList().then(() => {
    });
  }

}
