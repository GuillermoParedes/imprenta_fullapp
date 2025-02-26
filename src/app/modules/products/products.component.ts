import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = signal<any>([]);
  constructor(private router: Router, private productService: ProductsService) {
    this.productService.getProducts().then((response: any) => {
      this.products.set(response)
    })
  }
  crearProducto() {
    this.router.navigate(['home/products/new'])
  }

  editarProducto(producto: any) {
    console.log('editarCliente', producto)
    this.router.navigate([`home/products/${producto.id}/edit`])
  }
}
