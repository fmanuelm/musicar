import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Chartist.Bar('.xd', {
      labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      series: [20, 60, 120, 200, 180, 20, 10]
    }, {
      distributeSeries: true
    });
  }

}
