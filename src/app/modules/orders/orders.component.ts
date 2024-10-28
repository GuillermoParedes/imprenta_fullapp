import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  pedidos = signal<any>([
    // {
    //   id: 'asdasdasd',
    //   customer: {
    //     first_name: 'Samuel',
    //     last_name: 'Doria Medina'
    //   },
    //   totalAmount: 30750,
    //   dateShipping: new Date()
    // }
  ]);
  constructor(private router: Router, private readonly orderService: OrdersService) {
    this.orderService.getPedidos().then((response: any) => {
      console.log('resoise', response)
      this.pedidos.set(response)
    })
  }

  crearPedido() {
    this.router.navigate(['home/orders/new'])
  }
  editarPedido(pedido: any) {
    console.log('editarpedido', pedido)
    this.router.navigate([`home/orders/${pedido.id}/edit`])
  }

}
