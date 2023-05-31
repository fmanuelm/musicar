import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categories: any[];
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessagesPresaved();
    
  }
  selectCat(id: number)
  {
    this.messageService.setStep("briefcase");
  }
  getMessagesPresaved() {
    this.messageService.getMessagesPresavedCategories().subscribe(resp => {
      this.categories = resp;
      
    })
  }
}
