import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [DashboardRoutingModule, NgApexchartsModule],
})
export class DashboardModule { }
