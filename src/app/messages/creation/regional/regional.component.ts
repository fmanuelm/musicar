import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {
  groups: any[] = [];
  selectedGroups: {};
  constructor() { }

  ngOnInit(): void {
    this.groups = [
      {
        "punto": "456",
        "sucursal":"uno"
      },
      {
        "punto": "789",
        "sucursal":"dos"
      },
      {
        "punto": "657",
        "sucursal":"tres"
      }
    ];
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
}

}
