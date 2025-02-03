import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Menu, Menus } from '../interfaces/carga-menu.interface';
import { map, Observable } from 'rxjs';
import { MenuByID } from '../interfaces/carga-MenuById.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private usuario: Usuario;
  menus: Menu[] = [];
  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) {
    this.usuario = usuarioService.usuario;
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  getMenuCrear(data:FormData) {
    //http://localhost:9099/api/menu

    return this.http
      .post(`${baseUrl}/api/menu`, data,this.headers)

  }


  getMenu(): Observable<Menu[]> {
    return this.http
      .get<Menus>(`${baseUrl}/api/menu`, this.headers)
      .pipe(map(({ menu }) => /*  this.buildMenuTree(menu) */menu));
  }

  getMenuById(id:string) {
    return this.http
      .get<MenuByID>(`${baseUrl}/api/menu/${id}`, this.headers)
      .pipe(map(({ menu }) => menu));
  }

  getMenuUpdate(data:Menu) {
    return this.http
      .put(`${baseUrl}/api/menu/${data.id}`,data, this.headers)
    
  }

  getMenudelete(id:number) {
    return this.http
      .delete(`${baseUrl}/api/menu/${id}`, this.headers)
    
  }
  getPermiso(data: FormData) {
    return this.http.post(`${baseUrl}/api/permisos`, data, this.headers)
  }
  private buildMenuTree(menus: any) {
    console.log(menus)

  }




  /*  menu: any[] = [
     {
       icono: 'right fas fa-angle-left',
       titulo: ' Usuarios',
 
       submenu: [
         { titulo: 'Crear Usuario', url: 'usuario', roles: [1] },
 
         {
           titulo: 'Lista de Usuario',
           url: 'usuarios',
           roles: [1],
         },
       ],
     },
     {
       titulo: 'Gestión de ordenes',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Ingreso de ordenes',
           url: 'ingresordenes/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Lista de ordenes',
           url: 'ordenes',
           roles: [1],
           data: { titulo: 'orden' },
         },
         {
           titulo: 'manual',
           url: 'manual/Nuevo',
           roles: [1],
           data: { titulo: 'manual' },
         },
 
         {
           titulo: 'carga-ordenes',
           url: 'carga-ordenes',
           roles: [1],
           data: { titulo: 'carga-ordenes' },
         },
       ],
     },
 
 
     {
       titulo: 'AGENDAMIENTO',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Agendamiento',
           url: 'agendamiento',
           roles: [1, 'RECEPCION',],
         },
         {
           titulo: 'Agendados',
           url: 'agendados',
           roles: [1, 'RECEPCION',],
         },
 
         {
           titulo: 'Agendamiento manual',
           url: 'agendamiento-manual',
           roles: [1, 'RECEPCION',],
         },
       ],
     },
 
     {
       titulo: 'Gestión reportes',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Reporte pacientes',
           url: 'registro-Pacientes',
           roles: [1],
         },
         {
           titulo: 'Reporte producción',
           url: 'reporte-produccion',
           roles: [1],
         },
         {
           titulo: 'Reporte qc',
           url: 'reporte-qc',
           roles: [1],
         },
         {
           titulo: 'Reporte micro',
           url: 'report-micro',
           roles: [1],
         },
       ],
     },
     {
       titulo: 'CONSULTA DE RESULTADOS',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Consulta Web',
           url: 'consulta-web',
           roles: [1,],
         },
       ],
     },
     ,
     {
       titulo: 'MUESTRAS',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Lista muestra',
           url: 'muestra',
           roles: [1, ''],
         },
         {
           titulo: 'Muestras Aceptadas',
           url: 'muestras',
           roles: [1, ''],
         },
         {
           titulo: 'Muestras rechazadas',
           url: 'muestras-rechazo',
           roles: [1, ''],
         },
         {
           titulo: 'Muestras actualizar',
           url: 'muestras-actualización',
           roles: [1, ''],
         },
       ],
     }, {
       titulo: 'COMPRAS',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Compras',
           url: 'compras/Nuevo',
           roles: [1, 'COMPRAS'],
         },
         {
           titulo: 'consulta-compras',
           url: 'consulta-compras',
           roles: [1, 'COMPRAS'],
         },
       ],
     },
 
     {
       titulo: 'COMERCIAL',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'CREAR COTIZACION',
           url: 'cotizacion',
           roles: [1, 'COMPRAS'],
         },
         {
           titulo: 'COTIZACIONES',
           url: 'cotizaciones',
           roles: [1, 'COMPRAS'],
         },
       ],
     },
     {
       titulo: 'CONSULTA DE RESULTADOS',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Consulta Web',
           url: 'consulta-web',
           roles: [1, 'MICRO', 'MEDICO'],
         },
       ],
     },
 
     {
       titulo: 'IMPORTACION',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Solicitud de Pedido',
           url: 'pedido-importacion/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Pedidos',
           url: 'pedidos',
           roles: [1],
         },
         {
           titulo: 'Total pedidos',
           url: 'total-pedidos',
           roles: [1],
         },
         {
           titulo: 'reactivos',
           url: 'reactivos',
           roles: [1],
         },
       ],
     },
     {
       titulo: 'Gestión productos',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Carga masiva  productos',
           url: 'productos',
           roles: [1],
         },
         {
           titulo: 'Creación productos',
           url: 'producto/Nuevo',
           roles: [1],
         },
       ],
     },
 
     {
       titulo: 'MANTENIMIENTOS',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'CREAR MARCA',
           url: 'marca/Nuevo',
           roles: [1, 'OPERADOR'],
         },
         {
           titulo: 'CREAR MODALIDAD',
           url: 'modalidad',
           roles: [1],
         },
         {
           titulo: 'Tipo contrato',
           url: 'contrato',
           roles: [1],
         },
         {
           titulo: 'CLIENTE',
           url: 'cliente',
           roles: [1],
         },
         {
           titulo: 'PRUEBAS',
           url: 'panelPruebas/Nuevo',
           roles: [1],
         },
 
         {
           titulo: 'PERFILES',
           url: 'panelperfiles',
           roles: [1],
         },
 
         {
           titulo: 'GRUPO',
           url: 'grupo',
           roles: [1],
         },
         {
           titulo: 'ATENCION',
           url: 'atencion/Nuevo',
           roles: [1],
         },
         {
           titulo: 'SERVICIO',
           url: 'servicio/Nuevo',
           roles: [1],
         },
         {
           titulo: 'DIAGNOSTICO',
           url: 'diagnostico',
           roles: [1],
         },
 
         {
           titulo: ' EQUIPOS COMPLEMENTOS',
           url: 'equipocomplementario/Nuevo',
           roles: [1, 'OPERADOR'],
         },
 
         {
           titulo: 'TUBOS',
           url: 'tubos',
           roles: [1],
         },
         {
           titulo: 'TIPOMUESTRA',
           url: 'tipomuestra',
           roles: [1],
         },
         {
           titulo: 'TIPO FISIOLOGICO',
           url: 'tipofisiologico',
           roles: [1],
         },
         {
           titulo: 'UNIDAD RESULTADO ',
           url: 'unidad',
           roles: [1],
         },
 
         {
           titulo: 'UNIDAD DE EDAD ',
           url: 'unidadedad',
           roles: [1],
         },
         {
           titulo: 'IMPRESORA',
           url: 'impresora',
           roles: [1],
         },
 
         {
           titulo: 'CREAR CATEGORIA ',
           url: 'categoria/Nuevo',
           roles: [1, , 'OPERADOR'],
         },
 
         {
           titulo: 'CREAR MODELO EQUIPO',
           url: 'analizador/Nuevo',
           roles: [1, 'OPERADOR'],
         },
         {
           titulo: 'stock-pruebas',
           url: 'stock-pruebas',
           roles: [1],
         },
         {
           titulo: 'CREAR ESTADO',
           url: 'estado/Nuevo',
           roles: [1, 'OPERADOR'],
         },
         {
           titulo: 'CREAR UBICACION',
           url: 'ubicacion/Nuevo',
           roles: [1, 'OPERADOR'],
         },
 
         {
           titulo: 'CREAR  FINANCIERO PROVEEDOR',
           url: 'estadofinancieroproveedor/Nuevo',
           roles: [1, 'OPERADOR'],
         },
 
         {
           titulo: 'CREAR  FINANCIERO CLIENTE',
           url: 'estadofinancierocliente/Nuevo',
           roles: [1, 'OPERADOR'],
         },
       ],
     },
 
     {
       titulo: 'Configuración',
       icono: 'right fas fa-angle-left',
       submenu: [
          {
           titulo: 'Crear marca',
           url: 'marca/Nuevo',
           roles: [1],
         },
          {
           titulo: 'CREAR MODALIDAD',
            url: 'modalidad',
           roles: [1],
          },
 
         {
           titulo: 'Pruebas',
           url: 'panelPruebas/Nuevo',
           roles: [1],
         },
 
         {
           titulo: 'Perfiles',
           url: 'panelperfiles',
           roles: [1],
         },
 
         {
           titulo: 'Grupo',
           url: 'grupo',
           roles: [1],
         },
         {
           titulo: 'Atención',
           url: 'atencion/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Servicio',
           url: 'servicio/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Diagnostico',
           url: 'diagnostico',
           roles: [1],
         },
 
         {
           titulo: 'Tubos',
           url: 'tubos',
           roles: [1],
         },
         {
           titulo: 'Tipo muestra',
           url: 'tipomuestra',
           roles: [1],
         },
         {
           titulo: 'Tipo fisiologico',
           url: 'tipofisiologico',
           roles: [1],
         },
         {
           titulo: 'Unidad resultado ',
           url: 'unidad',
           roles: [1],
         },
 
         {
           titulo: 'Unidad edad ',
           url: 'unidadedad',
           roles: [1],
         },
         {
           titulo: 'Impresora',
           url: 'impresora',
           roles: [1],
         },
 
         {
           titulo: 'CREAR CATEGORIA ',
           url: 'categoria/Nuevo',
           roles: [1],
         },
 
         {
           titulo: 'CREAR MODELO EQUIPO',
           url: 'analizador/Nuevo',
           roles: [1],
         },
       ],
     },
 
     {
       titulo: 'Gestión catálogo',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Muestras',
           url: 'muestra/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Seccion',
           url: 'categoria/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Tecnica ',
           url: 'tecnica',
           roles: [1],
         },
       ],
     },
     
     {
       titulo: 'Gestión  equipos',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Listado equipos',
           url: 'equipos',
           roles: [1, 'OPERADOR'],
         },
         {
           titulo: 'Creación equipos',
           url: 'equipo/Nuevo',
           roles: [1, 'OPERADOR'],
         },
       ],
     }, 
     {
       titulo: ' Gestión Inventario',
       icono: 'right fas fa-angle-left',
       submenu: [
         {
           titulo: 'Carga stock',
           url: 'stock',
           roles: [1],
         },
 
         {
           titulo: 'Carga Interna',
           url: 'cargaInterna/Nuevo',
           roles: [1],
         },
         {
           titulo: 'Listado de stock ',
           url: 'listadoStock',
           roles: [1],
         },
          {
           titulo: 'CARGA STOCK MANUAL' no agregue , 
                     url: 'stock-manual',
           roles: [1],
         },
         {
           titulo: 'Detalle stock',
           url: 'stocks',
           roles: [1],
         },
         {
           titulo: 'Solicitud bodega',
           url: 'solicitud-pedidos/Nuevo',
 
           roles: [1, 'OPERADOR'],
         },
 
         {
           titulo: 'Solicitudes generadas',
           url: 'solicitudes-pedidos',
           roles: [1],
         },
         {
           titulo: 'Qr code',
           url: 'QRCode',
           roles: [1],
         },
         {
           titulo: 'Stock bodega',
           url: 'stockbodega',
           roles: [1,],
         },
           {
           titulo: 'descargobodega',
           url: 'descargobodega',
           roles: [1, 'DESCARGO'],
         }, 
 
           {
           titulo: 'Validacion',
           url: 'validacion',
           roles: [1],
         },
         {
           titulo: 'TRANSFERENCIA', no agregada
           url: 'transferencia',
           roles: [1],
         }, 
         {
           titulo: 'Crear proveedor',
           url: 'correos',
           roles: [1,],
         },
         {
           titulo: 'Bodega',
           url: 'bodega/Nuevo',
           roles: [1],
         },
           {
           titulo: 'Resultados',
           url: 'resultados',
           roles: [1],
         },
 
         {
           titulo: 'Reportes resultados',
           url: 'ReportesResultados',
           roles: [1],
         }, 
       ],
     },
   ];
 
   getMenuWithPermissions(): any[] {
     const userRoles = this.usuario.roleId;
     console.log(`**********ROL DE SERVICES***************`, userRoles);
 
     return this.menu.filter((item) => {
       if (item.submenu) {
         item.submenu = item.submenu.filter((subitem) => {
           if (subitem.roles) {
             return subitem.roles.some((role) => userRoles);
           } else {
             return true;
           }
         });
 
         return item.submenu.length > 0;
       } else {
         return true;
       }
     });
   } */
}
