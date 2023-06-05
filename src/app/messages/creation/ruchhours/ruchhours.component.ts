import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruchhours',
  templateUrl: './ruchhours.component.html',
  styleUrls: ['./ruchhours.component.css']
})
export class RuchhoursComponent implements OnInit {
  fromDate: Date = new Date();
  toDate: Date = new Date();
  feriados: string;
  daysOfWeek: any[] = [{label: 'Lu', value: 'lu'}, {label: 'Ma', value: 'ma'}, {label: 'Mi', value: 'mi'}, {label: 'Ju', value: 'ju'}, {label: 'Vi', value: 'vi'}, {label: 'Sa', value: 'sa'}, {label: 'Do', value: 'do'}];
  daySelect: string = 'lu';
  constructor() { }
  
  ngOnInit(): void {
  }

  next() {

  }

}
