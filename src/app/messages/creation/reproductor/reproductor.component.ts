import { Component, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements AfterViewInit {

  constructor() { }
  reproductor: HTMLAudioElement;
  @ViewChild('audioPlayer') audioPlayer: ElementRef<HTMLAudioElement>;
  @Input() audioSrc: string;
  ngAfterViewInit(): void {
    this.reproductor = this.audioPlayer.nativeElement;
    this.reproductor.addEventListener('ended', () => {
      // Aquí puedes realizar acciones cuando el audio se haya reproducido completamente
      alert('El audio ha finalizado');
    });
  }

}
