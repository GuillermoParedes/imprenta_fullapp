import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  getClients() {
    return lastValueFrom(this.httpService.get(`${this.urlBase}/clients`))
  }

}
