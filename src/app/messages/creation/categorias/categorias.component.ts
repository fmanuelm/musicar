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
    this.getMessagesCategoriesPresaved();
    
  }
  selectCat(id: number, title:string)
  {
    this.messageService.setStep("briefcase");
    let params = {"id": id, "title":title};
    this.messageService.setSelectCategory(params);
  }
  getMessagesCategoriesPresaved() {
    this.messageService.getMessagesPresavedCategories().subscribe(resp => {
      this.categories = resp;
      
    })
  }
}
