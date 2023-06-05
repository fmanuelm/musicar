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
import { Stepa3Component } from './creation/stepa3/stepa3.component';
import { Stepb3Component } from './creation/stepb3/stepb3.component';
import { Stepc3Component } from './creation/stepc3/stepc3.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BriefcaseComponent } from './briefcase/briefcase.component';
import { RuchhoursComponent } from './creation/ruchhours/ruchhours.component';
import { PuntosComponent } from './creation/puntos/puntos.component';


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
    Stepa3Component,
    Stepb3Component,
    Stepc3Component,
    BriefcaseComponent,
    RuchhoursComponent,
    PuntosComponent,
    
    
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
    RadioButtonModule
  ]
})
export class MessagesModule { }
