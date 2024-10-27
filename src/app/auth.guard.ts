import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // return true;
    if (this.authService.isAuthenticated()) { // Verifica si el usuario está autenticado
      return true;
    } else {
      this.router.navigate(['/auth/sign-in']); // Redirige a la página de login si no está autenticado
      return false;
    }
  }
}
