import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],

})
export class BreadcrumbComponent implements OnInit {

  constructor(public router: Router) { }

  @Input() view: string;
  @Input() id: any;

  ngOnInit(): void {
    console.log(this.id);

  }

}
