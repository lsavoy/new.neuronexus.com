import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as htmlToText from 'html-to-text';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  banner = [];
  searchKeyWord: any;
  searchResult: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;
  finalSearchResult: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.searchResult = undefined;
    this.activatedRoute.params.subscribe((params) => {
      if (params.searchKeyWord !== undefined) {
        this.searchKeyWord = params.searchKeyWord;
        this.getScienceUpdateStaticContent().then(() => {
        });
        this.getSearchResult(this.searchKeyWord);
      }
    });
   }

  ngOnInit(): void {
  }


  getSearchResult(searchKeyWord: any) {
    const data = {
      searchkey : searchKeyWord
    };
    this.api.post(`search`, data).subscribe((res: any) => {
      const keys = [];
      this.finalSearchResult = [];
      if (res.status === 200) {
        this.searchResult = res.data;
        this.searchResult.map((item: any) => {
          keys.push(Object.keys(item)[0]);
        });
        this.searchResult.map((item: any, index: any) => {
          if (item[keys[index]] !== null && item[keys[index]].length > 0) {
            this.finalSearchResult.push({key: keys[index], child: item[keys[index]]});
          }
        });
      } else if (res.status === 201) {
        this.searchResult = undefined;
      }
    }, (e) => {
      console.log(e);
    });
  }
  getScienceUpdateStaticContent() {
    const banner = [];
    const promise = new Promise((resolve, reject) => {
      this.api.get(`science_update/static`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'science_update/' + res.data.header_banner_image,  type: 'image', url: 'product'};
            banner.push(img);
            this.banner = banner;
          }
        } else if (res.status === 201) {
        }
        resolve();
        },
        (msg: any) => {
          reject(msg);
        });
    });
    return promise;
  }
  convertScienceUpdateDesc(desc: any) {
    if (desc !== undefined) {
    const text = htmlToText.fromString(desc, {
      wordwrap: 130
    });
    return text.slice(0, 100) + '...';
    }
  }
  goBackToPreviousPage() {
    this.location.back();
  }
  routeToThatPage(key: any , item: any) {
    if (key === 'product_list') {
      this.router.navigate(['/product']);
    } else if (key === 'product_list') {
      this.router.navigate(['/product']);
    } else if (key === 'product_static') {
      this.router.navigate(['/product']);
    } else if (key === 'meet_the_team') {
      this.router.navigate(['/team']);
    } else if (key === 'leadership') {
      this.router.navigate(['/team']);
    } else if (key === 'aboutus') {
      this.router.navigate(['/about']);
    } else if (key === 'brain') {
      this.router.navigate(['/brain-initiative']);
    } else if (key === 'brain_tab') {
      this.router.navigate(['/brain-initiative']);
    } else if (key === 'careers') {
      this.router.navigate(['/careers']);
    } else if (key === 'careers_opening') {
      this.router.navigate(['/careers']);
    } else if (key === 'distributors') {
      this.router.navigate(['/distributors']);
    } else if (key === 'partners') {
      this.router.navigate(['/distributors']);
    } else if (key === 'science_update_collaboration') {
      this.router.navigate(['/science-update-collaboration']);
    } else if (key === 'science_update_collaboration_tab') {
      this.router.navigate(['/science-update-collaboration']);
    } else if (key === 'contact') {
      this.router.navigate(['/contact']);
    } else if (key === 'supportstatic') {
      this.router.navigate(['/support']);
    } else if (key === 'supportcategory') {
      this.router.navigate(['/support']);
    } else if (key === 'knowledgeCenter') {
      this.router.navigate(['/knowledge-center/list']);
    } else if (key === 'science_update') {
      this.router.navigate(['/science-update/science-update-list']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
