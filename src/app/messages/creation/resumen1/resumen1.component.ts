import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen1',
  templateUrl: './resumen1.component.html',
  styleUrls: ['./resumen1.component.css']
})
export class Resumen1Component implements OnInit {

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
