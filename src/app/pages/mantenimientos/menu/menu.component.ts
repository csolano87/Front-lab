import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { event } from 'jquery';
import { Menu, MenuGrouped, Menus } from 'src/app/interfaces/carga-menu.interface';
import { MenuByID } from 'src/app/interfaces/carga-MenuById.interface';
import { Menuroles, User, UsuarioID } from 'src/app/interfaces/carga-usuarioByID.interface';
import { Nombre } from 'src/app/interfaces/cargaListapruebas.interface';
import { MenuBYID } from 'src/app/models/cargaMenuById.module';
import { Usuario } from 'src/app/models/usuario.module';

import { MenuService } from 'src/app/services/menu.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})


export class MenuComponent implements OnInit {
  btnVal = 'Guardar';

  groupedMenus: any[] = [];
  menuForm!: FormGroup;
  addmenuForm!: FormGroup;
  usuario: Usuario;
  menuItem: Menu[] = [];
  usuarioSeleccionado: User;
menuSeleccionado:MenuBYID;
  cargando: boolean = false;
  page;

  listamenu: Menu[] = [];
  search: string = '';
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
    //this.addMenu();
    this.usuario = usuarioService.usuario;


  }
  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.getMenu();
      this.CrearRuta(id)
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

  getMenu() {


    this.menuService.getMenu().subscribe((menu) => {
      this.listamenu = menu;
      console.log(this.listamenu)
      console.log(menu)
      const parentMenus = menu.filter(item => item.padreid === null);
      //console.log(parentMenus)
      this.groupedMenus = parentMenus.map(parent => {
        const children = menu.filter(menu => menu.padreid === parent.id);
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
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;

    }
if (this.menuSeleccionado) {
  const data ={
    id:this.menuSeleccionado.id,
    ...this.menuForm.value
  }
  this.menuService.getMenuUpdate(data).subscribe((resp:any)=>{
    const {msg}=resp;
    Swal.fire({icon:'success', text:`${msg}`});
    this.getMenu();
    $('#modal-menu').modal('hide');
    this.menuForm.disable();
    this.btnVal = 'Editar';
    this.menuSeleccionado = undefined;
    //this.router.navigateByUrl('/dashboard/menu');
  })
} else {
  this.menuService.getMenuCrear(this.menuForm.value).subscribe((resp: any) => {
    const { msg } = resp;

    Swal.fire({ icon: 'success', text: `${msg}` })
    $('#modal-menu').modal('hide');
    this.getMenu();
    this.router.navigateByUrl('/dashboard/menu');
  })
}


  }






  CrearRuta(id) {
    console.log(id);
    if (id === 'Nuevo') {
      this.menuForm.reset();
      this.menuForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.menuForm.disable();
    this.menuService.getMenuById(id).subscribe((menu) => {
      !menu
        ? this.router.navigateByUrl('/dashboard/menu')
        : console.log(menu);
      const { nombre, ruta, padreid, orden } = menu;
this.menuSeleccionado=menu;
      this.menuForm.setValue({
        nombre, ruta, padreid, orden
      })
    })



  }
  borrarMenu(menu: Menu) {
   const id= menu.id;


      Swal.fire({
        title: 'Desactivar menu?',
        text: `Esta seguro de desactivar  ${menu.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Si desactivar ?',
      }).then((result) => {
        if (result.value) {
          this.menuService.getMenudelete(id).subscribe((resp:any) => {
            const {msg}=resp;
            this.getMenu();
            Swal.fire(
              'Usuario Desactivado',
              `${msg} `,
              'success',
            );
          });
        }
      });



  }


  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.guardarMenu();
    }
    this.menuForm.enable();
    this.btnVal = 'Guardar';
  }
}
