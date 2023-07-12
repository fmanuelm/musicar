import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  msg_status : any[];
  responsiveOptions: any[] | undefined;
  ngOnInit(): void {
    this.msg_status = [
      {
        title: 'Gestión Copy',
        no: 10,
        class: 'card-dark-blue',
      },
      {
        title: 'Grabación',
        no: 5,
        class: 'card-yellow',
      },
      {
        title: 'Producción',
        no: 9,
        class: 'card-purple',
      },
      {
        title: 'Terminados',
        no: 20,
        class: 'card-light-blue',
      },
      {
        title: 'Descargados',
        no: 30,
        class: 'card-green',
      },
    ];

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

}
