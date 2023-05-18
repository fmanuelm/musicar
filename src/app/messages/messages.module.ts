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



@NgModule({
  declarations: [
    HomeComponent,
    BreadcrumbComponent,
    MainButtonsComponent,
    StatsPanelComponent,
    DashboardComponent,
    CreationComponent
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
  ]
})
export class MessagesModule { }