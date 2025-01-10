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
  groupedMenus: any[] = [];
  menuItems!: any[];
  menus: any[] = [];
  constructor(
    private sidebarService: SidebarService,
    private usuarioservice: UsuarioService,
  ) {
    (this.usuario = usuarioservice.usuario),
      //this.menuItems = sidebarService.getMenuItems();

      console.log(this.usuario);
    //this.menuItems=sidebarService.menu

    // this.menuItems = this.sidebarService.getMenuWithPermissions();
  }




  ngOnInit(): void {
    this.getMenuSiber();
    $('[data-widget="treeview"]').Treeview('init');
  }

  logout() {
    this.usuarioservice.logout();
  }






  getMenuSiber() {
    const menu = this.usuario.role.menu;
    console.log(menu)
  /*   this.sidebarService.getMenu().subscribe((menu) => {
      console.log(menu) */
      console.log(this.usuario.role.menu.filter(menu => menu.padreid ))
      const parentMenus = this.usuario.role.menu.filter(item => item.padreid === null);
      console.log(parentMenus)
      this.groupedMenus = parentMenus.map(parent => {
        const children = this.usuario.role.menu.filter(menu => menu.padreid === parent.id);
        return {
          nombre: parent.nombre,
          id: parent.id,
          items: [ ...children],
        };
      })
console.log(this.groupedMenus)
   // })
  }










}
