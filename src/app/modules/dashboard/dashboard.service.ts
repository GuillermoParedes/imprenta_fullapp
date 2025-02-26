import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  getStockProducts() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/dashboard/stock-products`))
  }

  getTopSells() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/dashboard/top-sells`))
  }
}
