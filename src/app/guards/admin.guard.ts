import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { UsuariosComponent } from '../pages/mantenimientos/usuarios/usuarios.component';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    console.log(this.usuarioService.role)
    const rolId= this.usuarioService.role;
    if (Number(rolId) === 1) {
      console.log(`************************`, this.usuarioService.role);
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
