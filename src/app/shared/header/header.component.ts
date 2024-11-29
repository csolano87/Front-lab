import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.module';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    private usuarioservice: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      console.log('params id', params['id']),
    );
  }
  buscarHeroe(id: string) {
    console.log(id);
    //[routerLink]="['/dashboard','orden', HIS.value ]
    this.router.navigate(['/dashborad', 'orden', id]);
  }
}
