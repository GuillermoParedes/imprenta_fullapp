import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  clients = signal<any>([]);

  constructor(private clientsService: ClientsService) {
    this.clientsService.getClients().then((response: any) => {
      console.log('resoise', response)
      this.clients.set(response)
    })
  }

}
