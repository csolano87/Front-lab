import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioservice: UsuarioService,
    private router: Router,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usuarioservice.validarToken().pipe(
      tap((estaAutenticado) => {
        console.log(estaAutenticado);
        if (estaAutenticado != true) {
          this.router.navigateByUrl('/login');
        }
      }),
    );
  }
}
