import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'new',
    component: NewComponent,
  },
  {
    path: ':id/edit',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule { }
