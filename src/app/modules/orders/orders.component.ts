import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
