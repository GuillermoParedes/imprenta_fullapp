import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = signal<any>([]);
  constructor(private router: Router) {
    // this.clientsService.getClients().then((response: any) => {
    //   console.log('resoise', response)
    //   this.clients.set(response)
    // })
  }
  crearProducto() {
    this.router.navigate(['home/products/new'])
  }

}
