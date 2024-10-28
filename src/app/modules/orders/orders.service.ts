import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  getPedidos() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/orders`))
  }

  createPedidos(newProduct: any) {
    return lastValueFrom(this.httpService.post(`${this.urlBase}/orders`, { ...newProduct }))
  }

  findPedido(id: string) {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/orders/${id}`))
  }

  updatePedido(id: string, editProduct: any) {
    return lastValueFrom(this.httpService.patch(`${this.urlBase}/orders/${id}`, { ...editProduct }))
  }

  deletePedido(id: string) {
    return lastValueFrom(this.httpService.delete(`${this.urlBase}/orders/${id}`))
  }
}
