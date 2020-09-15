import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'underscore';
import { FormService } from 'src/app/services/form.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('allOverSiteSeacrhForm', { static: true }) public allOverSiteSeacrhForm: any;
  seacrhForm: FormGroup;
  supportList: any;
  scienceList: any;
  technologyList: any;
  productListWithCategory: any;
  catlogAndBrouchers: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  isToggle = false;
  
  constructor(
    private api: ApiService,
    private formService: FormService,
    private router: Router
  ) {
    this.supportList = undefined;
    this.productListWithCategory = undefined;
    this.catlogAndBrouchers = undefined;
    this.scienceList = undefined;
    this.technologyList = undefined;
  }

  ngOnInit(): void {
    this.seacrhForm = this.formService.formInit(this.allOverSiteSeacrhForm);
    $('.search_btn').on('click', () => {
      $('.search').toggleClass('active');
    });
    $(window).scroll(() => {
      if ($(window).width() > 1024) {
        if ($(window).scrollTop() > 75) {
          $('.header').addClass('sticky');
        } else {
          $('.header').removeClass('sticky');
        }
      }
    });
    if (window.innerWidth <= 1024) {
      this.isToggle = true;
    } else {
      this.isToggle = false;
    }
    this.getProductList();
    this.getSupportList();
    this.getScienceList();
    this.getCatlogAndBrochursData();
    this.getTechnologyList();
  }

  getProductList() {
    this.api.get(`product/list/category`).subscribe((res: any) => {
      if (res.status === 200) {
        this.productListWithCategory = _.sortBy(res.data, 'order');
        this.productListWithCategory.map((item: any) => {
          if (item.productsList !== undefined && item.productsList.length > 0) {
            item.productsList = _.sortBy(item.productsList, 'order_sort');
          }
        });
      } else if (res.status === 201) {
        this.productListWithCategory = undefined;
      }
    }, (e) => {
    });
  }

  getSupportList() {
    this.api.get(`support/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.supportList = res.data;
        this.supportList.map((parent: any) => {
          if (parent.parent_id === null) {
            this.supportList.map((child: any) => {
              if (parent._id === child.parent_id) {
                parent.hasChild = true;
              }
            });
            this.supportList = _.sortBy(this.supportList, 'order_sort');
          }
        });
      } else if (res.status === 201) {
        this.supportList = undefined;
      }
    }, (e) => {
    });
  }

  getScienceList() {
    this.api.get(`science/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.scienceList = res.data;
        this.scienceList.map((parent: any) => {
          if (parent.parent_id === null) {
            this.scienceList.map((child: any) => {
              if (parent._id === child.parent_id) {
                parent.hasChild = true;
              }
            });
            this.scienceList = _.sortBy(this.scienceList, 'order_sort');
          }
        });
      } else if (res.status === 201) {
        this.scienceList = undefined;
      }
    }, (e) => {
    });
  }

  getTechnologyList() {
    this.api.get(`technology/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.technologyList = res.data;
        this.technologyList.map((parent: any) => {
          if (parent.parent_id === null) {
            this.technologyList.map((child: any) => {
              if (parent._id === child.parent_id) {
                parent.hasChild = true;
              }
            });
            this.technologyList = _.sortBy(this.technologyList, 'order_sort');
          }
        });
      } else if (res.status === 201) {
        this.technologyList = undefined;
      }
    }, (e) => {
    });
  }

  getCatlogAndBrochursData() {
    this.api.get(`catalogs/list`).subscribe((res: any) => {
      if (res.status === 200) {
        this.catlogAndBrouchers = res.data;
      } else if (res.status === 201) {
        this.catlogAndBrouchers = undefined;
      }
    }, (e) => {
    });
  }

  checkHasSubmenu(item: any) {
    if (item.hasChild) {
      return true;
    } else {
      return false;
    }
  }

  searchAgainstKeyword() {
    if (this.seacrhForm.valid) {
      $('.search').removeClass('active');
      this.router.navigate(['/search-result', this.seacrhForm.value.searchKeyword]);
      this.seacrhForm.reset();
    } else {
      Object.keys(this.seacrhForm.controls).forEach((key) => {
        this.seacrhForm.get(key).markAsTouched();
      });
      this.api.alert('Search-keyword is required', 'error');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 1024) {
      this.isToggle = true;
    } else {
      this.isToggle = false;
    }
  }
}
