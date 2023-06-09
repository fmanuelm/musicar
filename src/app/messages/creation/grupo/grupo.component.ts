import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  groups: any[] = [];
  selectedGroups: {};
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    
   this.getPoints();
  }
  getPoints()
  {
    this.messageService.getPoints().subscribe(resp => {
      console.dir(resp);
      this.groups = resp;
    });
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

  next1()
  {
    this.messageService.setStep("resumen1");
  }
  next2()
  {
    this.messageService.setStep("resumen2");
  }
}
