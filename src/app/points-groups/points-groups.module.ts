import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { PointsGroupsRoutes } from './points-groups.routing';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
    BreadcrumbComponent
  ],
  imports: [
    RouterModule.forChild(PointsGroupsRoutes),
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
  ]
})
export class PointsGroupsModule { }
