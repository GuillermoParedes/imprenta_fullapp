import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import {
  ApexChart,
  ApexXAxis, NgApexchartsModule
} from 'ng-apexcharts';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';

interface IBarChart {
  series: { name: string; data: number[] }[];
  chart: ApexChart; // 👈 Aquí aseguramos el tipo correcto
  xaxis: ApexXAxis;
  colors: string[];
}
interface IPieChart {
  series: number[];
  chart: ApexChart;
  labels: string[];
  colors: string[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  clientesCount = 90;
  productosCount = 193;
  pedidosCount = 15;
  barChart: IBarChart = {
    series: [{
      name: 'Cantidad de Productos',
      data: [35, 28, 42, 30, 20] // Sustituir con datos reales
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Folletos', 'Invitaciones', 'Libros', 'Otros', 'Tarjetas Personales']
    },
    colors: ['#1E88E5']
  };
  pieChart: IPieChart = {
    series: [35, 28, 42, 30, 20], // Datos reales de productos por categoría
    chart: {
      type: 'pie',
      height: 'auto',
      toolbar: {
      }
    },
    labels: ['Folletos', 'Invitaciones', 'Libros', 'Otros', 'Tarjetas Personales'],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
  };

  lineChart: IBarChart = {
    series: [{
      name: 'Tendencia de X',
      data: [50, 140, 130, 125, 110, 105, 100] // Datos de stock real
    }, {
      name: 'Tendencia de A',
      data: [10, 140, 130, 125, 110, 105, 100] // Datos de stock real
    }, {
      name: 'Tendencia de H',
      data: [150, 140, 130, 125, 110, 105, 100] // Datos de stock real
    }],
    chart: {
      type: 'line',
      height: 350,
      toolbar: {

        tools: {
          zoom: false,
          pan: false,
          reset: false,
          zoomin: false,
          zoomout: false
        }
      }
    },
    xaxis: {
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio']
    },
    colors: ['#F44336']
  };
  dashboardService = inject(DashboardService)
  resumen: any = {};
  constructor(private readonly clientService: ClientsService, private readonly productsService: ProductsService, private readonly pedidosService: OrdersService) { }

  ngOnInit(): void {

    this.clientService.getClients().then((response: any) => {
      this.clientesCount = response.length
    })
    this.productsService.getProducts().then((response: any) => {
      this.productosCount = response.length
    })
    this.pedidosService.getPedidos().then((response: any) => {
      this.pedidosCount = response.length
    })
    this.pedidosService.getRevenue().then((response: any) => {
      this.resumen = response;
    })
    this.dashboardService.getStockProducts().then((response: any) => {
      console.log('response', response)
      if (response) {
        this.barChart = {
          ...this.barChart,
          series: [{
            name: 'Cantidad de Productos',
            data: response.map((item: any) => item.count) // Sustituir con datos reales
          }],
          xaxis: {
            categories: response.map((item: any) => item.name)
          },
        }
      }
    })
    this.dashboardService.getTopSells().then((response: any) => {
      console.log('response', response)
      if (response) {
        this.lineChart = response
      }
    })

  }
}
