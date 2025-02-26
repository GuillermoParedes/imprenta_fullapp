import { Component, computed, signal } from '@angular/core';
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
  // Computed para filtrar clientes naturales
  clientesNaturales = computed(() =>
    this.clients().filter((client: any) => client.type === 'NATURAL')
  );

  // Computed para filtrar clientes jurídicos
  clientesJuridicos = computed(() =>
    this.clients().filter((client: any) => client.type === 'JURIDICA')
  );


  constructor(private clientsService: ClientsService, private router: Router) {
    this.loadClients();
  }
  async loadClients() {
    try {
      const response = await this.clientsService.getClients();
      console.log('Clientes obtenidos:', response);
      this.clients.set(response || []);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  }
  crearCliente() {
    this.router.navigate(['home/clients/new'])
  }
  editarCliente(cliente: any) {
    console.log('editarCliente', cliente)
    this.router.navigate([`home/clients/${cliente.id}/edit`])
  }
}
