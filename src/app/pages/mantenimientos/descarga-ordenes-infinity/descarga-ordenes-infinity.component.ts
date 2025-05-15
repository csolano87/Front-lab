import { Component, OnInit } from '@angular/core';

import { OrdenInfinity } from 'src/app/interfaces/carga_ordeneInfinity.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { format } from 'date-fns';
@Component({
  selector: 'app-descarga-ordenes-infinity',

  templateUrl: './descarga-ordenes-infinity.component.html',
  styleUrl: './descarga-ordenes-infinity.component.css',
})
export class DescargaOrdenesInfinityComponent implements OnInit {
  fechaActual = new Date();

  constructor(private mantenimientoService: MantenimientosService) {}
  cargando: boolean = false;
  listainfinity: OrdenInfinity[] = [];
  public page!: number;

  ngOnInit(): void {
  //  this.getResults();
  }

  getResults(fechaIn:string,fechaOut:string) {
    this.cargando = true;

    this.mantenimientoService.getOrdenesInfinty(fechaIn,fechaOut).subscribe((ordenInfinity) => {
      this.listainfinity = ordenInfinity;

      this.cargando = false;
    });

  }

  generarJson() {
    const jsonStr = JSON.stringify(this.listainfinity, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    const resultado = 'ImportarOrdenes'+''+format(this.fechaActual, 'yyyy-MM-dd HH:mm:ss');

    link.download = `${resultado}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
