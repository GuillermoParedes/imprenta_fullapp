import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

}
