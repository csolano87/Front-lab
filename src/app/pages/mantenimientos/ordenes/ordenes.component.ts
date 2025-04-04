import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { Orden } from 'src/app/models/orden.module';
import { OrdenesService } from 'src/app/services/ordenes.service';
import Swal from 'sweetalert2';

import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import {
  Ingresoordenes,
  Ordene,
} from 'src/app/interfaces/cargaIngresoordenes.interface';
import { OrdenID } from 'src/app/interfaces/carga-IngresordenId.interface';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
})
export class OrdenesComponent implements OnInit {
  fechaActual: string = new Date().toISOString().split('T')[0];
  public totalAceptas: number = 0;
  ordenBorrarActivo = 1;
  public totalIngresada: number = 0;
  TotalEmergencia: number = 0;
  public ordenes: Orden[] = [];
  public ordenesTemp: Orden[] = [];
  public desde: number = 0;
  public page!: number;
  listaOrdenId: OrdenID;

  public listaordenesingresdas: Ordene[] = [];
  public search: number = null;
  searchNombre: string = '';
  public cargando: boolean = true;
  constructor(
    private ordenServicie: OrdenesService,
    public agendamientoService: AgendamientoService,
    private manteniminetoService: MantenimientosService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    console.log(this.fechaActual);
    this.cargarOrdenes();
    this.escucharSocket();
    this.getOrdenes(this.fechaActual);
  }
getOrdenes(fecha: string) {
    console.log(fecha);

    this.manteniminetoService.getIngresoOrdenes(fecha).subscribe((ordenes) => {
      console.log(ordenes);
      this.listaordenesingresdas = ordenes;
    });
  }
  cargarOrdenes() {
    this.cargando = true;
    /*  this.ordenServicie.cargarOrdenes(this.desde) */
    this.ordenServicie
      .cargarOrdenes()
      .subscribe(({ TotalAcepta, TotalEmergencia, ordenes }) => {
        console.log('DETALES ESTAEDO', TotalAcepta);
        this.totalAceptas = TotalAcepta;
        this.totalIngresada = this.totalIngresada;
        this.TotalEmergencia = TotalEmergencia;
        this.ordenes = ordenes;
        this.ordenesTemp = ordenes;
        this.cargando = false;
      });
  }

  buscar(
    IDENTIFICADOR: string,
    ESTADO: string,
    HIS: string,
    SALA: string,
    PRIORIDAD: string,
    APELLIDO: string,
  ) {
    this.cargando = true;
    console.log({ IDENTIFICADOR, ESTADO, HIS, SALA, PRIORIDAD, APELLIDO });

    this.ordenServicie
      .buscarFiltroOrdenes(
        IDENTIFICADOR,
        ESTADO,
        HIS,
        SALA,
        PRIORIDAD,
        APELLIDO,
      )
      .subscribe((resultados) => {
        this.ordenes = resultados;
        this.cargando = false;
      });
  }

  eliminarOrden(orden: Orden) {
    if (orden.ESTADO != '1') {
      return; // No hacer nada si el estado es '1'
    }
    console.log(orden.id);

    Swal.fire({
      title: 'Eliminar Orden?',
      text: `Esta seguro que desea eliminar la orden ${orden.HIS}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      console.log('NUMERO OBTENIDO', result.value);
      if (result.value) {
        this.ordenServicie.eliminarOrden(orden).subscribe(
          (resp) => {
            this.cargarOrdenes();
            Swal.fire(
              'Orden Eliminada',
              `${orden.HIS} fue desactivado correctamente`,
              'success',
            );
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.msg,
            });
            console.log('MSG ERROR', err.error.msg);
          },
        );
      }
    });
  }

  imprimirOrden(orden) {
    console.log(`//////************`, orden.id);
    const storedOption = localStorage.getItem('selectedOption');
    Swal.fire({
      title: 'Seleccione una impresora',
      input: 'select',
      inputOptions: {
        Zebra: {
          ZBR1: 'Recepcion 1',
          ZBR2: 'Recepcion 2',
        },
      },
      inputValue: storedOption, // Establecer la opción almacenada como valor predeterminado
      inputPlaceholder: 'Seleccione una impresora',
      showCancelButton: true,

      inputAttributes: {
        style: 'font-size: 16px; margin: 10px auto;width:90%;', // Ajusta estos valores según tus preferencias
      },
      preConfirm: (selectedValue) => {
        localStorage.setItem('selectedOption', selectedValue);
        orden.CODIMPRESORA = selectedValue;
        const data = {
          ...orden,
        };

        console.log(`******agregar impre***`, data);
        this.ordenServicie.EnviarOrden(data).subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Envio a procesar a Infinity ', `${msg}`, 'success');
        });
      },
    });
  }

  escucharSocket() {
    this.agendamientoService
      .listen('orden-sais')
      .subscribe((ordenSais: any) => {
        console.log(ordenSais);
        this.ordenes = ordenSais;
      });
  }

  OrdenId(orden: Ordene) {
    console.log(orden);
    this.manteniminetoService
      .getIngresoOrdenId(orden.id.toString())
      .subscribe((ordenId) => {
        console.log(ordenId.prueba);
        this.listaOrdenId = ordenId;
      });
  }
  deleteOrden(orden: Ordene) {
    console.log(orden);
    if (orden.estado != 1) {
      return;
    }
    console.log(orden.id);

    Swal.fire({
      title: 'Eliminar Orden?',
      text: `Esta seguro que desea eliminar la orden ${orden.numeroorden}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      console.log('NUMERO OBTENIDO', result.value);
      if (result.value) {
        this.manteniminetoService.getDeleteIngresoOrden(orden.id).subscribe(
          (resp: any) => {
            const { msg } = resp;
            console.log(msg);
            //this.getOrdenes();
            Swal.fire('Orden Eliminada', `${msg}`, 'success');
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.msg,
            });
            console.log('MSG ERROR', err.error.msg);
          },
        );
      }
    });
  }
  /* searchNombre */

  onSearchNombre(searchNombre: any) {
    console.log(searchNombre);
    this.searchNombre = searchNombre;

    console.log(this.search);
  }
  onSearchOrden(search: any) {
    console.log(search);
    this.search = search;

    console.log(this.search);
  }

  descargarPdf(id: number) {
    console.log(id);
    this.manteniminetoService.generarPdf(id).subscribe((blob: Blob) => {
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  /*   fechaActual():void {
    this.fecha= formatDate(new Date(), 'yyyy-MM-dd', 'en-US ');

  } */
}
