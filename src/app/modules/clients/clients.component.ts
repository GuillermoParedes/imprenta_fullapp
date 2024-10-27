import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  clients = signal<any>([]);

  constructor(private clientsService: ClientsService, private router: Router) {
    this.clientsService.getClients().then((response: any) => {
      console.log('resoise', response)
      this.clients.set(response)
    })
  }

  crearCliente() {
    this.router.navigate(['home/clients/new'])
  }
  editarCliente(cliente: any) {
    console.log('editarCliente', cliente)
    this.router.navigate([`home/clients/${cliente.id}/edit`])
  }
}
