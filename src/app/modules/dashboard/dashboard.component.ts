import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class DashboardComponent implements OnInit {
  clientesCount = 90;
  productosCount = 193;
  pedidosCount = 15;
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
