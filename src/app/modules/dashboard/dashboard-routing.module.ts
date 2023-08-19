import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardResolveGuard } from 'src/app/guards/dashboard-resolve.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboard: DashboardResolveGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
