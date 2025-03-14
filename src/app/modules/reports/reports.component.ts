import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IReports {
  title: string;
  description: string,
  url: string;
  params?: any
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  
  startDate: string = "";
  endDate: string = "";
  
  listReports = [
    { title: 'Resumen de Clientes - Naturales', description: 'Datos sobre nuevos y antiguos clientes.', url: 'http://localhost:3000/reports/summary-clients-natural' },
    { title: 'Resumen de Clientes - Juridicos', description: 'Datos sobre nuevos y antiguos clientes.', url: 'http://localhost:3000/reports/summary-clients-juridica' },
    { title: 'Stock de Productos', description: 'Datos sobre la cantidad de productos actuales.', url: 'http://localhost:3000/reports/stock-products' },
    { title: 'Pedidos Entregados', description: 'Datos de los pedidos.', url: 'http://localhost:3000/reports/orders', params: { status: 'ENTREGADO'} },
    { title: 'Pedidos Cancelados', description: 'Datos de los pedidos.', url: 'http://localhost:3000/reports/orders', params: { status: 'CANCELADO'} },
    { title: 'Pedidos Pendientes', description: 'Datos de los pedidos.', url: 'http://localhost:3000/reports/orders', params: { status: 'PENDIENTE'} },
  ]

  reports = signal<Array<IReports>>([]);

  http = inject(HttpClient)
  filterReports() {
    this.reports.set([]);
    console.log('this.startDate', this.startDate)
    console.log('this.endDate', this.endDate)
    setTimeout(() => {
      this.reports.set([...this.listReports].map(item => {
        return {
          ...item,
          params: {
            ...item.params ?? {},
            startDate: this.startDate,
            endDate: this.endDate
          }
        }
      }))
    }, 600)
    
  }

  getReportUrl(report: IReports): void {
    console.log('gerReporUrl', report)
    const queryParams = new URLSearchParams({
      startDate: report.params.startDate,
      endDate: report.params.endDate,
      status: report.params.status
    }).toString();
    
    const url = `${report.url}?${queryParams}`;

    let nameReport = report.title;
    if (report.params.startDate && report.params.endDate) {
      nameReport = `${report.title} - ${report.params.startDate} : ${report.params.endDate}`;
    } else if(report.params.startDate) {
      nameReport = `${report.title} - ${report.params.startDate}`;
    } else if (report.params.endDate) {
      nameReport = `${report.title} - ${report.params.endDate}`;
    }
    console.log('nameReport', nameReport)
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `${nameReport}`; // Cambia la extensión si es necesario
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
    
  }

}
