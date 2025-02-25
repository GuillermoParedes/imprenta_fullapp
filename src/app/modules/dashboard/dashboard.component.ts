import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import {
  ApexChart,
  ApexXAxis, NgApexchartsModule
} from 'ng-apexcharts';

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
  imports: [NgApexchartsModule],
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
      height: 350
    },
    labels: ['Folletos', 'Invitaciones', 'Libros', 'Otros', 'Tarjetas Personales'],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
  };

  lineChart: IBarChart = {
    series: [{
      name: 'Stock de Productos',
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

  }
}
