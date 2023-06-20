import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutes } from './messages.routing';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { HomeComponent } from './home/home.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MainButtonsComponent } from './home/main-buttons/main-buttons.component';
import { StatsPanelComponent } from './home/stats-panel/stats-panel.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CreationComponent } from './creation/creation.component';
import { StepsModule } from 'primeng/steps';
import { Step1Component } from './creation/step1/step1.component';
import { Stepa1Component } from './creation/stepa1/stepa1.component';
import { Step2Component } from './creation/step2/step2.component';
import { CategoriasComponent } from './creation/categorias/categorias.component';
import { Step3Component } from './creation/step3/step3.component';
import { Stepc3Component } from './creation/stepc3/stepc3.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BriefcaseComponent } from './briefcase/briefcase.component';
import { RuchhoursComponent } from './creation/ruchhours/ruchhours.component';
import { PuntosComponent } from './creation/puntos/puntos.component';
import { GrupoComponent } from './creation/grupo/grupo.component';
import { AccordionModule } from 'primeng/accordion';
import { RegionalComponent } from './creation/regional/regional.component';
import { PuntosGrupoRegionalComponent } from './creation/puntos-grupo-regional/puntos-grupo-regional.component';
import { Resumen1Component } from './creation/resumen1/resumen1.component';
import { Resumen2Component } from './creation/resumen2/resumen2.component';
import { ValidacionComponent } from './validacion/validacion.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { FixedhoursComponent } from './creation/fixedhours/fixedhours.component';
import { SequenceComponent } from './creation/sequence/sequence.component';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    HomeComponent,
    BreadcrumbComponent,
    MainButtonsComponent,
    StatsPanelComponent,
    DashboardComponent,
    CreationComponent,
    Step1Component,
    Stepa1Component,
    Step2Component,
    CategoriasComponent,
    Step3Component,
    Stepc3Component,
    BriefcaseComponent,
    RuchhoursComponent,
    PuntosComponent,
    GrupoComponent,
    RegionalComponent,
    PuntosGrupoRegionalComponent,
    Resumen1Component,
    Resumen2Component,
    ValidacionComponent,
    AprobacionComponent,
    FixedhoursComponent,
    SequenceComponent,
    
    
  ],
  imports: [
    RouterModule.forChild(MessagesRoutes),
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
    StepsModule,
    CalendarModule,
    SelectButtonModule,
    CheckboxModule,
    RadioButtonModule,
    AccordionModule,
    DropdownModule,
    SliderModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule
  ]
})
export class MessagesModule { }
  