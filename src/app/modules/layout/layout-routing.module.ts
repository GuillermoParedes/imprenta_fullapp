import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'clients',
        loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'reports',
        loadComponent: () => import('../reports/reports.component').then((m) => m.ReportsComponent),
      },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

// const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: LayoutComponent,
//     loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
//   },
//   {
//     path: 'clients',
//     component: LayoutComponent,
//     loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
//   },
//   {
//     path: 'products',
//     component: LayoutComponent,
//     loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule),
//   },
//   {
//     path: 'orders',
//     component: LayoutComponent,
//     loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule),
//   },
//   {
//     path: 'reports',
//     component: LayoutComponent,
//     loadComponent: () => import('../reports/reports.component').then((m) => m.ReportsComponent),
//   },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: '**', redirectTo: 'error/404' },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
