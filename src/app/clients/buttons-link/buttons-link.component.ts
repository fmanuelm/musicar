import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-link',
  templateUrl: './buttons-link.component.html',
  styleUrls: ['./buttons-link.component.css']
})
export class ButtonsLinkComponent implements OnInit {

  constructor(public router: Router) { }

  @Input() view: string;
  
  ngOnInit(): void {
  }

}
