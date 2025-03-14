import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  getClients() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/clients`))
  }

  getPedidos(id: string) {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/clients/${id}/orders`))
  }

  createClients(newClient: any) {
    return lastValueFrom(this.httpService.post(`${this.urlBase}/clients`, { ...newClient }))
  }

  findClient(id: string) {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/clients/${id}`))
  }

  updateClient(id: string, editClient: any) {
    return lastValueFrom(this.httpService.patch(`${this.urlBase}/clients/${id}`, { ...editClient }))
  }

  deleteClient(id: string) {
    return lastValueFrom(this.httpService.delete(`${this.urlBase}/clients/${id}`))
  }
}
