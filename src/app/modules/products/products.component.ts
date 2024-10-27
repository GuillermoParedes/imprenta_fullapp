import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
