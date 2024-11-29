import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.module';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
//import * as $ from 'jquery'
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  menuItems!: any[];
  constructor(
    private sidebarService: SidebarService,
    private usuarioservice: UsuarioService,
  ) {
    (this.usuario = usuarioservice.usuario),
      //this.menuItems = sidebarService.getMenuItems();

      console.log(this.menuItems);
    //this.menuItems=sidebarService.menu

    this.menuItems = this.sidebarService.getMenuWithPermissions();
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }

  logout() {
    this.usuarioservice.logout();
  }
}
