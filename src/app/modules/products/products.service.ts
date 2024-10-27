import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  getProducts() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/products`))
  }

  createProducts(newProduct: any) {
    return lastValueFrom(this.httpService.post(`${this.urlBase}/products`, { ...newProduct }))
  }

  findProduct(id: string) {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/products/${id}`))
  }

  updateProduct(id: string, editProduct: any) {
    return lastValueFrom(this.httpService.patch(`${this.urlBase}/products/${id}`, { ...editProduct }))
  }

  deleteProduct(id: string) {
    return lastValueFrom(this.httpService.delete(`${this.urlBase}/products/${id}`))
  }
}
