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
  disabledAudio1: boolean = true;
  fileUrl: string = "";
  audioUrl2: string = "";
  fileName: string = "";
  fileToUpload: any;
  tipo_pregrabado:string = "";
  @ViewChild('audioPlayer2') audioPlayer2: any;
  @ViewChild('audioPlayer1') audioPlayer1: any;
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
    this.clearAudio2();
  }
  
  next() {
    console.log("module: " + this.messageService.getModule());
    
    // verificar si hay un audio. Si hay un audio
    if (this.tipo_pregrabado === 'personalizado')
    {
      const addAudio = {
        tipo_pregrabado: 'personalizado'
      };
      this.messageService.setMsgExterno(addAudio);
    }
    
    if (this.messageService.getModule() === 'horas_fijas')
    {
      console.log("horas fijas");
      if (this.form.valid) {
        const datosForm = {
          referencia_mensaje: this.form.get('referencia').value,
          contenido_mensaje: this.form.get('texto').value,
          file: this.fileToUpload,
          observaciones: this.form.get('observaciones').value
        };
        this.messageService.setMsgExterno(datosForm);
        this.messageService.setStep("horas_fijas");
      }
    }
    if (this.messageService.getModule() === 'secuencia')
    {
      console.log("secuencia");
      if (this.form.valid) {
        const datosForm = {
          referencia_mensaje: this.form.get('referencia').value,
          contenido_mensaje: this.form.get('texto').value,
          file: this.fileToUpload,
          observaciones: this.form.get('observaciones').value
        };
        this.messageService.setMsgExterno(datosForm);
        this.messageService.setStep("secuencia");
      }
    }
    if (this.messageService.getModule() === 'locutor_virtual')
    {
      console.log("locutor");
      if (this.form.valid) {
        const datosForm = {
          referencia_mensaje: this.form.get('referencia').value,
          contenido_mensaje: this.form.get('texto').value,
          file: this.fileToUpload,
          observaciones: this.form.get('observaciones').value
        };
        this.messageService.setMsgExterno(datosForm);
        this.messageService.setStep("rushhours");
      }
    }
    
  }
  next2() {
    if (this.form.valid) {
      this.messageService.setStep("secuencia");
    }
  }
  next3() {
    if (this.form.valid) {
      this.messageService.setStep("rushhours");
    }
  }
  clearAudio()
  {
    this.cleanFile();
    this.disabledAudio1 = true;
    this.audioPlayer1.nativeElement.src = "";
    
  }
  clearAudio2()
  {
    this.cleanFile();
    this.disabledAudio2 = true;
    this.audioPlayer2.nativeElement.src = "";
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
    this.tipo_pregrabado = "";
    this.adjunto = {};
    this.btnImage = false;
    this.btnAudio1 = false;
    this.btnAudio2 = false;
    this.btnDocument = false;
    this.disabledCategories = false;
    this.audioUrl2 = "";
    this.fileUrl = "";
  }
  onFileSelectedAudio(event: any) {
    this.tipo_pregrabado = "personalizado";
    const file = event.target.files[0];
    this.fileToUpload = file;
    const fileName = file.name;
    this.fileName = file.name;
    
    const fileExtension = fileName.split('.').pop().toLowerCase();
    this.adjunto = {nombre: fileName, ext: fileExtension};
    
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const contenido = event.target.result;
      this.audioPlayer1.nativeElement.src = contenido;
    };
    reader.readAsDataURL(file);
    this.btnImage = true;
    this.btnAudio1 = true;
    this.btnAudio2 = true;
    this.btnDocument = true;
    this.disabledCategories = true;
    this.disabledAudio2 = true;
    this.disabledAudio1 = false;
  }
  onFileSelected(event: any) {
    this.tipo_pregrabado = "";
    const file = event.target.files[0]; 
    this.fileToUpload = file;
    const fileName = file.name;
    this.fileName = file.name;  
    
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    this.adjunto = {nombre: fileName, ext: fileExtension};
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const contenido = event.target.result;
      this.fileUrl = contenido;
    };
    reader.readAsDataURL(file);

    this.btnImage = true;
    this.btnAudio1 = true;
    this.btnAudio2 = true;
    this.btnDocument = true;
    this.disabledCategories = true;
  
    if (fileExtension === 'pdf')
    {
      this.btnDocument = false;
    }
    if (fileExtension === 'xls')
    {
      this.btnDocument = false;
    }
    if (fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'jpg')
    {
      this.btnImage = false;
    }
    
    
  }
  onFileSelected2(event: any)
  {
    this.tipo_pregrabado = "personalizado";
    const file = event.target.files[0];
    this.fileToUpload = file;
    const fileName = file.name;
    this.fileName = file.name;
    
    const fileExtension = fileName.split('.').pop().toLowerCase();
    //this.adjunto = {nombre: fileName, ext: fileExtension};
    this.adjunto = {};
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const contenido = event.target.result;
      this.audioPlayer2.nativeElement.src = contenido;
    };
    reader.readAsDataURL(file);
    this.btnImage = true;
    this.btnAudio1 = true;
    this.btnAudio2 = false;
    this.btnDocument = true;
    this.disabledCategories = true;
    this.disabledAudio2 = false;
  }
}
