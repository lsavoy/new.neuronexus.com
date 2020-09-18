import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamBioComponent } from 'src/app/modal/team-bio/team-bio.component';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  banner = [];
  teamStaticContent: any;
  leadershipList: any;
  salesList: any;
  BASE_IMAGE_URL = environment.BASE_IMAGE_URL;

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) {
    this.banner = [];
    this.teamStaticContent = undefined;
   }

  ngOnInit(): void {
    this.getAbourtStaticContentforHeaderImage().then(()=>{
      this.getStaticContent().then(()=>{
        this.getLeadershipList().then(()=>{
          this.getSalesList();
        });
      });
    });
  }
  getAbourtStaticContentforHeaderImage() {
    const promise = new Promise((resolve, reject) => {
      const banner = [];
      this.api.get(`about/aboutus/staticinfo`).toPromise().then((res: any) => {
        if (res.status === 200) {
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
            const img = {imagesrc: this.BASE_IMAGE_URL + 'cms/' + res.data.header_banner_image,  type: 'image', url: 'about'};
            banner.push(img);
            this.banner = banner;
          }
        } else if (res.status === 201) {
        }
        resolve();
      }, (e : any) => {
        reject(e)
      });
    });
    return promise;
  }

  getStaticContent() {
    const promise = new Promise((resolve,reject)=>{
      this.api.get(`about/meet-the-team/staticinfo`).subscribe((res: any) => {
        if (res.status === 200) {
          this.teamStaticContent = res.data;
          if (res.data.header_banner_image !== undefined || res.data.header_banner_image !== '') {
          const img = {imagesrc: res.data.header_banner_image,  type: 'image', url: 'team'};
          this.banner.push(img);
          }
        } else if (res.status === 201) {
          this.teamStaticContent = undefined;
        }
        resolve();
      }, (e : any) => {
        reject(e);
      });
    });
    return promise;
  }
  getLeadershipList() {
    // const data = [
        //   {
        //     image: 'daryl-691x1024.jpg',
        //     name: 'Daryl Kipke',
        //     qualification: 'PhD',
        //     designation: 'Chief Executive Officer & Managing Director of NeuroNexus & NEL Group, Inc.'
        //   },
        //   {
        //     image: 'rio-697x1024.jpeg',
        //     name: 'Rio Vetter',
        //     qualification: 'PhD',
        //     designation: 'Chief Technology Officer & VP of Research'
        //   },
        //   {
        //     image: 'jamie-695x1024.jpeg',
        //     name: 'Jamille Hetke',
        //     qualification: 'MS',
        //     designation: 'VP of Engineering'
        //   },
        //   {
        //     image: 'taegyun-689x1024.jpeg',
        //     name: 'Taegyun Moon',
        //     qualification: 'PhD',
        //     designation: 'VP of Strategy & Business Development'
        //   },
        //   {
        //     image: 'priyanka-691x1024.jpeg',
        //     name: 'Priyanka Seghal',
        //     qualification: 'MS',
        //     designation: 'Director of Operations'
        //   },
        //   {
        //     image: 'alexis-704x1024.jpg',
        //     name: 'Alexis Paez',
        //     qualification: 'PhD',
        //     designation: 'Director of Science Outreach'
        //   }
        // ];
        // this.leadershipList = data;
    const promise = new Promise((resolve,reject)=>{
      this.api.get(`about/leadership/list`).toPromise().then((res: any) => {
        if (res.status === 200) {
          this.leadershipList = res.data;
        } else if (res.status === 201) {}
        resolve();
      }, (e: any) => {
        reject(e);
      });
    });
    return promise;
  }

  getSalesList() {
    // const data = [
    //   {
    //     image: 'sales_01.jpg',
    //     name: 'Lawrence Savoy',
    //     designation: 'Sales Team Leader'
    //   },
    //   {
    //     image: 'sales_02.jpg',
    //     name: 'Madison Bodnar',
    //     designation: 'Sales Executive'
    //   },
    //   {
    //     image: 'sales_03.jpeg',
    //     name: 'Emery Clark',
    //     designation: 'Sales Executive'
    //   },

    //   {
    //     image: 'sales_04.jpeg',
    //     name: 'Matt Davis',
    //     designation: 'Sales Executive'
    //   },
    //   {
    //     image: 'sales_05.jpg',
    //     name: 'Mollie Smith',
    //     designation: 'Sales Executive'
    //   },
    //   {
    //     image: 'sales_06.jpg',
    //     name: 'Asiyeh Golabchi, PhD',
    //     designation: 'Principal Applications Scientist'
    //   },

    //   {
    //     image: 'sales_07.jpeg',
    //     name: 'Jeff Adams',
    //     designation: 'Technical Sales & Support Specialist'
    //   },
    //   {
    //     image: 'sales_08.jpg',
    //     name: 'Isabel Kipke Kurcz',
    //     designation: 'Marketing & Social Media Specialist'
    //   },
    //   {
    //     image: 'sales_09.jpg',
    //     name: 'Nicki Ziehr',
    //     designation: 'Accounts Manager'
    //   },
    // ];
    // this.salesList = data;
    this.api.get('about/sales/list').subscribe((res:any)=>{
      if(res.status === 200){
        this.salesList = res.data;
      }else{
        this.salesList = undefined;
      }
    }, err => {
      this.salesList = undefined;
    })
  }

  openBio(member){
    this.dialog.open(TeamBioComponent, {
      data: {member: member},
     
    })
  }

}
