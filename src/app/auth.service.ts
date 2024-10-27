import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase: string = environment.backend;
  httpService = inject(HttpClient)

  isAuthenticated(): boolean {
    // Aquí se verifica la autenticación (ej. token de usuario en localStorage)
    return !!localStorage.getItem('token'); // Ejemplo básico usando un token
  }

  signIn(username: string, password: string) {
    return lastValueFrom(this.httpService.post(`${this.urlBase}/auth/login`, { username, password }))
  }

}
