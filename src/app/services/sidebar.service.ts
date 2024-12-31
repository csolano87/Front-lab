import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Menu, Menus } from '../interfaces/carga-menu.interface';
import { map, Observable } from 'rxjs';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private usuario: Usuario;
  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
  ) {
    this.usuario = usuarioService.usuario;
  }
  getMenu(): Observable<Menu[]> {
    return this.http
      .get<Menus>(`${baseUrl}/api/menu`)
      .pipe(map(({ menu }) => menu));
  }
  menu: any[] = [
    {
      icono: 'right fas fa-angle-left',
      titulo: ' Usuarios',

      submenu: [
        { titulo: 'Crear Usuario', url: 'usuario', roles: ['ADMIN'] },

        {
          titulo: 'Lista de Usuario',
          url: 'usuarios',
          roles: ['ADMIN'],
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
          roles: ['ADMIN', 'DOCTOR'],
        },
        {
          titulo: 'Lista de ordenes',
          url: 'ordenes',
          roles: ['ADMIN', 'DOCTOR'],
          data: { titulo: 'orden' },
        },
        {
          titulo: 'manual',
          url: 'manual/Nuevo',
          roles: ['ADMIN', 'DOCTOR'],
          data: { titulo: 'manual' },
        },

        {
          titulo: 'carga-ordenes',
          url: 'carga-ordenes',
          roles: ['ADMIN', 'DOCTOR'],
          data: { titulo: 'carga-ordenes' },
        },
      ],
    },

    /* 
    {
      titulo: 'AGENDAMIENTO',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Agendamiento',
          url: 'agendamiento',
          roles: ['ADMIN', 'RECEPCION', ],
        },
        {
          titulo: 'Agendados',
          url: 'agendados',
          roles: ['ADMIN', 'RECEPCION', ],
        },

        {
          titulo: 'Agendamiento manual',
          url: 'agendamiento-manual',
          roles: ['ADMIN', 'RECEPCION', ],
        },
      ],
    }, */

    {
      titulo: 'Gestión reportes',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Reporte pacientes',
          url: 'registro-Pacientes',
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte producción',
          url: 'reporte-produccion',
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte qc',
          url: 'reporte-qc',
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte micro',
          url: 'report-micro',
          roles: ['ADMIN', 'MICRO'],
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
          roles: ['ADMIN', 'MICRO', 'DOCTOR', 'MEDICO'],
        },
      ],
    },
    ,
    /*   {
      titulo: 'MUESTRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Lista muestra',
          url: 'muestra',
          roles: ['ADMIN', ''],
        },
        {
          titulo: 'Muestras Aceptadas',
          url: 'muestras',
          roles: ['ADMIN', ''],
        },
        {
          titulo: 'Muestras rechazadas',
          url: 'muestras-rechazo',
          roles: ['ADMIN', ''],
        },
        {
          titulo: 'Muestras actualizar',
          url: 'muestras-actualización',
          roles: ['ADMIN', ''],
        },
      ],
    } */ /*  {
      titulo: 'COMPRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Compras',
          url: 'compras/Nuevo',
          roles: ['ADMIN', 'COMPRAS'],
        },
        {
          titulo: 'consulta-compras',
          url: 'consulta-compras',
          roles: ['ADMIN', 'COMPRAS'],
        },
      ],
    },  */

    /*   {
      titulo: 'COMERCIAL',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'CREAR COTIZACION',
          url: 'cotizacion',
          roles: ['ADMIN', 'COMPRAS'],
        },
        {
          titulo: 'COTIZACIONES',
          url: 'cotizaciones',
          roles: ['ADMIN', 'COMPRAS'],
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
          roles: ['ADMIN', 'MICRO', 'DOCTOR',  'MEDICO'],
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
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Pedidos',
          url: 'pedidos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Total pedidos',
          url: 'total-pedidos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'reactivos',
          url: 'reactivos',
          roles: ['ADMIN', 'IMPORT'],
        },
      ],
    },*/
    {
      titulo: 'Gestión productos',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Carga masiva  productos',
          url: 'productos',
          roles: ['ADMIN', 'IMPORT', 'INVENTARIO'],
        },
        {
          titulo: 'Creación productos',
          url: 'producto/Nuevo',
          roles: ['ADMIN', 'IMPORT', 'INVENTARIO'],
        },
      ],
    },

    /* {
      titulo: 'MANTENIMIENTOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'CREAR MARCA',
          url: 'marca/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'CREAR MODALIDAD',
          url: 'modalidad',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Tipo contrato',
          url: 'contrato',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'CLIENTE',
          url: 'cliente',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'PRUEBAS',
          url: 'panelPruebas/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'PERFILES',
          url: 'panelperfiles',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'GRUPO',
          url: 'grupo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'ATENCION',
          url: 'atencion/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'SERVICIO',
          url: 'servicio/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'DIAGNOSTICO',
          url: 'diagnostico',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: ' EQUIPOS COMPLEMENTOS',
          url: 'equipocomplementario/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'TUBOS',
          url: 'tubos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'TIPOMUESTRA',
          url: 'tipomuestra',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'TIPO FISIOLOGICO',
          url: 'tipofisiologico',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'UNIDAD RESULTADO ',
          url: 'unidad',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'UNIDAD DE EDAD ',
          url: 'unidadedad',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'IMPRESORA',
          url: 'impresora',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'CREAR CATEGORIA ',
          url: 'categoria/Nuevo',
          roles: ['ADMIN', , 'OPERADOR'],
        },

        {
          titulo: 'CREAR MODELO EQUIPO',
          url: 'analizador/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'stock-pruebas',
          url: 'stock-pruebas',
          roles: ['ADMIN'],
        },
        {
          titulo: 'CREAR ESTADO',
          url: 'estado/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'CREAR UBICACION',
          url: 'ubicacion/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'CREAR  FINANCIERO PROVEEDOR',
          url: 'estadofinancieroproveedor/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'CREAR  FINANCIERO CLIENTE',
          url: 'estadofinancierocliente/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
      ],
    }, */

    {
      titulo: 'Configuración',
      icono: 'right fas fa-angle-left',
      submenu: [
        // {
        //   titulo: 'Crear marca',
        //   url: 'marca/Nuevo',
        //   roles: ['ADMIN'],
        // },
        // {
        //   titulo: 'CREAR MODALIDAD',
        //   url: 'modalidad',
        //   roles: ['ADMIN', 'IMPORT'],
        // },

        {
          titulo: 'Pruebas',
          url: 'panelPruebas/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'Perfiles',
          url: 'panelperfiles',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'Grupo',
          url: 'grupo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Atención',
          url: 'atencion/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Servicio',
          url: 'servicio/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Diagnostico',
          url: 'diagnostico',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'Tubos',
          url: 'tubos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Tipo muestra',
          url: 'tipomuestra',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Tipo fisiologico',
          url: 'tipofisiologico',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Unidad resultado ',
          url: 'unidad',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'Unidad edad ',
          url: 'unidadedad',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Impresora',
          url: 'impresora',
          roles: ['ADMIN', 'IMPORT'],
        },

        // {
        //   titulo: 'CREAR CATEGORIA ',
        //   url: 'categoria/Nuevo',
        //   roles: ['ADMIN'],
        // },

        // {
        //   titulo: 'CREAR MODELO EQUIPO',
        //   url: 'analizador/Nuevo',
        //   roles: ['ADMIN'],
        // },
      ],
    },

    {
      titulo: 'Gestión catálogo',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Muestras',
          url: 'muestra/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Seccion',
          url: 'categoria/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Tecnica ',
          url: 'tecnica',
          roles: ['ADMIN', 'IMPORT'],
        },
      ],
    },
    /* 
    {
      titulo: 'Gestión  equipos',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Listado equipos',
          url: 'equipos',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'Creación equipos',
          url: 'equipo/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
      ],
    }, */
    {
      titulo: ' Gestión Inventario',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Carga stock',
          url: 'stock',
          roles: ['ADMIN', 'INVENTARIO'],
        },

        {
          titulo: 'Carga Interna',
          url: 'cargaInterna/Nuevo',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'Listado de stock ',
          url: 'listadoStock',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        //  {
        //   titulo: 'CARGA STOCK MANUAL',
        //   url: 'stock-manual',
        //   roles: ['ADMIN', 'INVENTARIO'],
        // },
        {
          titulo: 'Detalle stock',
          url: 'stocks',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'Solicitud bodega',
          url: 'solicitud-pedidos/Nuevo',

          roles: ['ADMIN', 'OPERADOR', 'INVENTARIO'],
        },

        {
          titulo: 'Solicitudes generadas',
          url: 'solicitudes-pedidos',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'Qr code',
          url: 'QRCode',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'Stock bodega',
          url: 'stockbodega',
          roles: ['ADMIN', 'OPERADOR', 'INVENTARIO'],
        },
        /*  {
          titulo: 'descargobodega',
          url: 'descargobodega',
          roles: ['ADMIN', 'INVENTARIO', 'DESCARGO'],
        }, */

        /*  {
          titulo: 'Validacion',
          url: 'validacion',
          roles: ['ADMIN'],
        },
        {
          titulo: 'TRANSFERENCIA',
          url: 'transferencia',
          roles: ['ADMIN'],
        }, */
        {
          titulo: 'Crear proveedor',
          url: 'correos',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'Bodega',
          url: 'bodega/Nuevo',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        /*   {
          titulo: 'Resultados',
          url: 'resultados',
          roles: ['ADMIN'],
        },

        {
          titulo: 'Reportes resultados',
          url: 'ReportesResultados',
          roles: ['ADMIN'],
        }, */
      ],
    },
  ];

  getMenuWithPermissions(): any[] {
    const userRoles = this.usuario.rol;
    console.log(`**********ROL DE SERVICES***************`, userRoles);

    return this.menu.filter((item) => {
      if (item.submenu) {
        item.submenu = item.submenu.filter((subitem) => {
          if (subitem.roles) {
            return subitem.roles.some((role) => userRoles.includes(role));
          } else {
            return true;
          }
        });

        return item.submenu.length > 0;
      } else {
        return true;
      }
    });
  }
}
