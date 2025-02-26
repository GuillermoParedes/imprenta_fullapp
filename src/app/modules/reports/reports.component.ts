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
    { title: 'Informe de Ventas', description: 'Reporte mensual de ventas y estadísticas.', url: 'http://localhost:3000/reports/download' },
    { title: 'Resumen de Clientes', description: 'Datos sobre nuevos y antiguos clientes.', url: 'http://localhost:3000/reports/download' },
    { title: 'Estado de Inventario', description: 'Análisis de stock y productos disponibles.', url: 'http://localhost:3000/reports/download' },
    { title: 'Desempeño Financiero', description: 'Reporte financiero del último trimestre.', url: 'http://localhost:3000/reports/download' },
    { title: 'Tendencias del Mercado', description: 'Estudio sobre tendencias y proyecciones.', url: 'http://localhost:3000/reports/download' }
  ]);
}
