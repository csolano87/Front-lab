import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { event } from 'jquery';
import { MenuGrouped } from 'src/app/interfaces/carga-menu.interface';
import { Menu, Menuroles, User, UsuarioID } from 'src/app/interfaces/carga-usuarioByID.interface';
import { Nombre } from 'src/app/interfaces/cargaListapruebas.interface';
import { Usuario } from 'src/app/models/usuario.module';

import { MenuService } from 'src/app/services/menu.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { text } from 'stream/consumers';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-permisos',

  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent implements OnInit {

  groupedMenus: any[] = [];
  menuForm!: FormGroup;
  addmenuForm!: FormGroup;
  usuario: Usuario;
  menuItem: Menu[] = [];
  usuarioSeleccionado: User;
  get nombre() {
    return (
      this.menuForm?.get('nombre')!.invalid &&
      this.menuForm?.get('nombre')!.touched
    );
  }

  get orden() {
    return (
      this.menuForm?.get('orden')!.invalid &&
      this.menuForm?.get('orden')!.touched
    );
  }
  get menu() {
    return this.addmenuForm.get('menu') as FormArray;
  }
  constructor(private menuService: SidebarService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.crearFormulario()
    this.addMenu();
    this.usuario = usuarioService.usuario;


  }
  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.getMenu();
      this.CrearUsuario(id)
    }
    )
    this.getMenu();
    console.log(this.groupedMenus)
  }


  isChecked(menuId: number): boolean {
    console.log(menuId)
    const menuArray = this.addmenuForm.get('menu') as FormArray;
    return menuArray.value.some(menuItem => menuItem.menuId === menuId);
  }
  crearFormulario() {
    this.menuForm
      = this.fb.group({


        nombre: ['', [Validators.required]],
        ruta: ['',],
        padreid: ['',],
        orden: ['', [Validators.required]],

      })

  }
  addMenu() {
    this.addmenuForm = this.fb.group({
      id: ['', [Validators.required]],
      menu: this.fb.array([])

    })
  }
  addMenuId() {


    return this.fb.group({

      menuId: ['', [Validators.required]],
      nombre: [''],
      RoleId: ['', [Validators.required]],
      nombreRol: [''],
    })

  }
  getMenu() {


    this.menuService.getMenu().subscribe((menu) => {
      console.log(menu)
      const parentMenus = menu.filter(item => item.padreid === null && item.estado !== false);
      //console.log(parentMenus)
      this.groupedMenus = parentMenus.map(parent => {
        const children = menu.filter(menu => menu.padreid === parent.id && menu.estado !== false);
        return {
          nombre: parent.nombre,
          id: parent.id,
          items: [parent, ...children],
        };
      });

      console.log(this.groupedMenus)
    })



  }

  onreset() {

  }

  guardarMenu() {
    if (this.addmenuForm.invalid) {
      this.addmenuForm.markAllAsTouched();
      return;

    }
    console.log(this.addmenuForm.value)
    this.menuService.getPermiso(this.addmenuForm.value).subscribe((resp: any) => {
     const {msg}=resp;
     this.getMenu();
     Swal.fire({icon:'success', html:`<strong>${msg}</strong>`})
    })

  }




  onChangeMenu($event: any, item) {

    const isChecked = $event.target.checked;
    const menuArray = this.addmenuForm.get('menu') as FormArray;
    console.log(isChecked, item)
    console.log(this.usuarioSeleccionado)

    if (isChecked == true) {
      this.addmenuForm.get('id').setValue(this.usuarioSeleccionado.id),
        this.menu.push(
          this.fb.group({

            menuId: item.id,
            RoleId: this.usuarioSeleccionado.roleId
          })

        )

    } else {
      console.log(item)
      console.log(menuArray.value)
      const index = menuArray.value.findIndex(
        x => x.menuId == item.id
      );
      console.log(index)
      this.menu.removeAt(index)
    }

  }

  CrearUsuario(id) {
    console.log(id);

    this.usuarioService.GetUsuarioById(id).subscribe((user) => {
      console.log(user)
      this.usuarioSeleccionado = user;
      console.log(user)
      const userMenus = user.role.menu.map(item => item.id);

      console.log(userMenus)
      console.log(this.groupedMenus)
      for (const group of this.groupedMenus) {
        for (const item of group.items) {
          const isChecked = userMenus.includes(item.id);
          console.log(isChecked)
          if (isChecked) {
            this.addmenuForm.get('id').setValue(this.usuarioSeleccionado.id)
            this.menu.push(
              this.fb.group({
                /*  id: user.id, */
                menuId: item.id,
                RoleId: user.roleId,
              })
            );
          }
        }
      }


    })


  }
}
