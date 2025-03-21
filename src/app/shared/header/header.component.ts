import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notificar } from 'src/app/interfaces/carga-notificar.interface';
import { Usuario } from 'src/app/models/usuario.module';
import { NotificarDespachosService } from 'src/app/services/notificar-despachos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Mensaje } from 'src/app/models/cargaMensaje.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  notificarDespacho: Notificar[] = [];
  mensaje: Mensaje;
  constructor(
    private usuarioservice: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificarDespachosservice: NotificarDespachosService,
    private toastr: ToastrService,
  ) {
    this.usuario = usuarioservice.usuario;
  }

  ngOnInit(): void {
    /*  Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${this.mensaje?.mensaje}`,
      showConfirmButton: false,
      timer: 1500,
    }); */
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
  getNotificar() {
    this.notificarDespachosservice
      .getNotificar(this.usuario.id)
      .subscribe((notificar) => {
        console.log(notificar);
        this.notificarDespacho = notificar.filter((item) =>
          item.estado.includes('pendiente')
        );
      });
  }
  escucharSocket() {
    this.notificarDespachosservice
      .listen('notificardespacho')
      .subscribe((notificardespacho: any) => {
        console.log(`notificardespacho`, notificardespacho);
        this.mensaje = notificardespacho;
      });
  }

  updateNotificar(id: number, estado: string) {
    console.log(`el id ${id} tiene estado ${estado}`);
 const data = {
      id: id,
      estado: estado,
    };
    console.log(`data`,data)
    this.notificarDespachosservice
      .updateNotificar(data)
      .subscribe((resp: any) => {
        const { msg } = resp;
        this.getNotificar();
        this.toastr.success(`${msg}`);
      }); 
  }
}
