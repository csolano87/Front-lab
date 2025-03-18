import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notificar } from 'src/app/interfaces/carga-notificar.interface';
import { Usuario } from 'src/app/models/usuario.module';
import { NotificarDespachosService } from 'src/app/services/notificar-despachos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  notificarDespacho: Notificar[] = [];
  constructor(
    private usuarioservice: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
       private notificarDespachosservice: NotificarDespachosService,
  ) {}

  ngOnInit(): void {
    this.getNotificar();
    this.escucharSocket();
    this.activatedRoute.params.subscribe((params) =>
      console.log('params id', params['id']),
    );
  }
  buscarHeroe(id: string) {
    console.log(id);
    //[routerLink]="['/dashboard','orden', HIS.value ]
    this.router.navigate(['/dashborad', 'orden', id]);
  }
getNotificar(){
  this.notificarDespachosservice.getNotificar().subscribe((notificar)=>{
    console.log(notificar)
    this.notificarDespacho =notificar;

  })
}
  escucharSocket() {
    this.notificarDespachosservice
      .listen('notificardespacho')
      .subscribe((notificardespacho: any) => {
        console.log(`notificardespacho`, notificardespacho);
     /*    this.notificarDespacho = notificardespacho; */
      });
  }
}
