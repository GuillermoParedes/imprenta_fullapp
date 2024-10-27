import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    // Aquí se verifica la autenticación (ej. token de usuario en localStorage)
    return !!localStorage.getItem('token'); // Ejemplo básico usando un token
  }
}
