import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchFacilityRoutes } from './branch-facility.routing';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MaterialModule } from '../app.module';
import { ClientsService } from '../clients/service/clients.service';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ButtonsLinkComponent } from './buttons-link/buttons-link.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent,
    EditComponent,
    ButtonsLinkComponent,
    BreadcrumbComponent
  ],
  imports: [
    RouterModule.forChild(BranchFacilityRoutes),
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,  
  ]
})
export class BranchFacilityModule { }
