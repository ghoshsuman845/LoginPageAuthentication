import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController} from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public options: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Type Of Users'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Student',
            y: 61.41,
            sliced: true,
            selected: true
        },  {
            name: 'Instructor',
            y: 2.61
        }]
    }]
};
  subscription: Subscription;

  
  userEmail: string;
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthenticateService
  ) { }


  ionViewDidLoad() {

  }


  ngOnInit() {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      Highcharts.chart('container', this.options);
    } else {
      this.navCtrl.navigateBack('');
    }
  //   const source = interval(10000);

  //   // Sample API
  //   const apiLink = 'https://api.myjson.com/bins/13lnf4';

  //   this.subscription = source.subscribe(val => this.getApiResponse(apiLink).then(
  //     data => {
  //       const updated_normal_data = [];
  //       const updated_abnormal_data = [];
  //       data.forEach(row => {
  //         const temp_row = [
  //           new Date(row.timestamp).getTime(),
  //           row.value
  //         ];
  //         row.Normal === 1 ? updated_normal_data.push(temp_row) : updated_abnormal_data.push(temp_row);
  //       });
  //       this.options.series[0]['data'] = updated_normal_data;
  //       this.options.series[1]['data'] = updated_abnormal_data;
  //       Highcharts.chart('container', this.options);
  //     },
  //     error => {
  //       console.log('Something went wrong.');
  //     })
  //   );
  // }

  // getApiResponse(url) {
  //   return this.http.get(url, {})
  //     .toPromise().then(res => {
  //       return res;
  //     });
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }



}
