import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public router: Router, private messageService: MessageService) { }

  @Input() view: string;
  @Input() id: any;

  ngOnInit(): void {
  }

  formulario() {
    this.messageService.setStep("formulario");
  }
}
