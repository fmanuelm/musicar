import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  constructor(private elementRef: ElementRef, private router:Router) {}
  // constructor(private navbarTitleService: NavbarTitleService) { }
  carouselItems: any[] = [
    {'text':'Voice<br/>Experience', 'url':'/#/mensajes/home'},
    {'text':'Musical<br/>Experience','url':''},
    {'text':'Visual<br/>Experience', 'url':''},
    {'text':'Service &<br/>Equipment', 'url':''},
    {'text':'Olfa<br/>Experience', 'url':''},
  ];
  images: any[] = [
    {"src": "/assets/img/slider/voice.png", "color": "#FEDD56"},
    {"src": '/assets/img/slider/musical.png', "color": "#008CCA"},
    {"src": '/assets/img/slider/visual.png', "color": "#D12A42"},
    {"src": '/assets/img/slider/service.png', "color": "#50C981"},
    {"src": '/assets/img/slider/olfa.png', "color" : "#B492CB"}
  ];
  bgSlide: string[] = ["#FEDD56","#008CCA","#D12A42","#50C981","#B492CB"];
  currentColumn = 0;
  itemUnderline = 0;
  isMenuOpen: boolean = true;
  public ngOnInit() {
    this.preloadImages(this.images).then(() => {
      setInterval(() => {
        this.currentColumn = (this.currentColumn + 1) % this.carouselItems.length;
        
        this.itemUnderline = this.currentColumn;
      }, 3000); // 3 seconds
    });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private preloadImages(images: any[]): Promise<any> {
    const imagePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.src;
      });
    });
    return Promise.all(imagePromises);
  }
  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.router.navigate(['/auth/login']);
  }
  get visibleCarouselItems(): string[] {
    if (window.innerWidth <= 768) {
      //const startIndex = this.currentColumn === 0 ? 0 : this.currentColumn - 1;
      //const endIndex = startIndex + 3 <= this.carouselItems.length ? startIndex + 3 : this.carouselItems.length;
      
      if (this.currentColumn === 0 || this.currentColumn < 3)
      {
        //return this.carouselItems.slice(startIndex, endIndex);
        return this.carouselItems.slice(0, 3);
      }
      else {
        this.itemUnderline = this.currentColumn === 3?0:1;
        
        return this.carouselItems.slice(3, 5);
      }
      
    } else {
      return this.carouselItems;
    }
  }
}
