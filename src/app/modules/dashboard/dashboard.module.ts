import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardResolveGuard } from 'src/app/guards/dashboard-resolve.guard';
import { DashboardService } from 'src/app/services/dashboard.service';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
    DashboardResolveGuard,
    DashboardService
  ]
})
export class DashboardModule { }
