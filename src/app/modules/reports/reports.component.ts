import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reports = signal([
    { title: 'Resumen de Clientes - Naturales', description: 'Datos sobre nuevos y antiguos clientes.', url: 'http://localhost:3000/reports/summary-clients-natural' },
    { title: 'Resumen de Clientes - Juridicos', description: 'Datos sobre nuevos y antiguos clientes.', url: 'http://localhost:3000/reports/summary-clients-juridica' },
    { title: 'Stock de Productos', description: 'Datos sobre la cantidad de productos actuales.', url: 'http://localhost:3000/reports/stock-products' },
  ]);
}
