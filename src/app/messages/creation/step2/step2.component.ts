import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  @ViewChild('documentUpload') documentInputRef!: ElementRef;
  @ViewChild('imageUpload') imageInputRef!: ElementRef;
  @ViewChild('audioUpload') audioInputRef!: ElementRef;
  @ViewChild('audioUpload2') audioInputRef2!: ElementRef;
  
  form: FormGroup;
  adjunto: any = {};
  btnImage: boolean = false;
  btnDocument: boolean = false;
  btnAudio1: boolean = false;
  btnAudio2: boolean = false;
  disabledCategories: boolean = false;
  disabledAudio2: boolean = true;
  fileUrl: string = "";
  audioUrl2: string = "";
  constructor(private _formBuilder: FormBuilder, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      referencia: [null, [Validators.required]],
      texto: [null, [Validators.required]],
      observaciones: [null, null],
    });
  }

  
  clearForm() {
    this.form.reset();
    this.cleanFile();
  }
  next() {
    console.log("module: " + this.messageService.getModule());
    if (this.messageService.getModule() === 'horas_fijas')
    {
      console.log("horas fijas");
      if (this.form.valid) {
        this.messageService.setStep("horas_fijas");
      }
    }
    if (this.messageService.getModule() === 'secuencia')
    {
      console.log("secuencia");
      if (this.form.valid) {
        this.messageService.setStep("secuencia");
      }
    }
    if (this.messageService.getModule() === 'locutor_virtual')
    {
      console.log("locutor");
      if (this.form.valid) {
        this.messageService.setStep("rushhours");
      }
    }
  }
  clearAudio2()
  {
    this.cleanFile();
    this.disabledAudio2 = true;
  }
  handleUploadAudioClick() {
    const audioElement = this.audioInputRef.nativeElement;
    audioElement.click();
  }
  handleUploadAudioClick2() {
    const audioElement2 = this.audioInputRef2.nativeElement;
    audioElement2.click();
  }
  handleUploadImageClick() {
    const imageElement = this.imageInputRef.nativeElement;
    imageElement.click();
  }
  handleUploadDocumentClick() {
    const documentElement = this.documentInputRef.nativeElement;
    documentElement.click();
  }
  cleanFile()
  {
    this.adjunto = {};
    this.btnImage = false;
    this.btnAudio1 = false;
    this.btnAudio2 = false;
    this.btnDocument = false;
    this.disabledCategories = false;
    this.audioUrl2 = "";
    this.fileUrl = "";
  }
  onFileSelected(event: any) {
    const file = event.target.files[0]; 
    const fileName = file.name;
    this.fileUrl = URL.createObjectURL(file);
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    this.adjunto = {nombre: fileName, ext: fileExtension};
    this.btnImage = true;
    this.btnAudio1 = true;
    this.btnAudio2 = true;
    this.btnDocument = true;
    this.disabledCategories = true;
  
    if (fileExtension === 'pdf')
    {
      this.btnDocument = false;
    }
    if (fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'jpg')
    {
      this.btnImage = false;
    }
    if (fileExtension === 'mp3')
    {
      this.btnAudio1 = false;
    }
    
  }
  onFileSelected2(event: any)
  {
    const file = event.target.files[0];
    this.audioUrl2 = URL.createObjectURL(file);
    this.btnImage = true;
    this.btnAudio1 = true;
    this.btnAudio2 = false;
    this.btnDocument = true;
    this.disabledCategories = true;
    this.disabledAudio2 = false;
  }
}
