import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen2',
  templateUrl: './resumen2.component.html',
  styleUrls: ['./resumen2.component.css']
})
export class Resumen2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollTop();
  }

  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }
  refresh()
  {
    location.reload();
  }
}
