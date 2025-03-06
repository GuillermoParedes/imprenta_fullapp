import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { OrderStatusModal } from './orders-status.modal';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, NgClass, OrderStatusModal, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
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

  selectedRecord: any = null;
  constructor(private router: Router, private readonly orderService: OrdersService) {
    this.orderService.getPedidos().then((response: any) => {
      this.pedidos.set(response)
    })
  }

  crearPedido() {
    this.router.navigate(['home/orders/new'])
  }
  editarPedido(pedido: any) {
    console.log('editarpedido', pedido)
    // this.router.navigate([`home/orders/${pedido.id}/edit`])
    this.selectedRecord = pedido;
  }
  updateStatus(newStatus: string) {
    console.log('updateStatus', newStatus)
    console.log('updateStatus', this.selectedRecord)
    const { customerId, dateShipping, quantity } = this.selectedRecord
    this.orderService.updatePedido(this.selectedRecord.id, {
      customerId, dateShipping, quantity,
      status: newStatus
    }).then(((response: any) => {
      this.orderService.getPedidos().then((response: any) => {
        this.pedidos.set(response)
      })
      this.selectedRecord = null;
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude editar el producto',
        });
      });
  }

}
