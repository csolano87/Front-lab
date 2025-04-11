import { Component, OnInit } from '@angular/core';
import { OrdenInfinity } from 'src/app/interfaces/carga_ordeneInfinity.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';

@Component({
  selector: 'app-descarga-ordenes-infinity',

  templateUrl: './descarga-ordenes-infinity.component.html',
  styleUrl: './descarga-ordenes-infinity.component.css',
})
export class DescargaOrdenesInfinityComponent implements OnInit {
  constructor(private mantenimientoService: MantenimientosService) {}
  cargando: boolean = false;
  listainfinity: OrdenInfinity[] = [];
  public page!: number;

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.cargando = true;

    this.mantenimientoService.getOrdenesInfinty().subscribe((ordenInfinity) => {
      this.listainfinity = ordenInfinity;

      this.cargando = false;
    });
  }

  generarJson() {
    const jsonStr = JSON.stringify(this.listainfinity, null, 2);
    console.log(`jsonStr`,jsonStr)
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link= document.createElement('a');
    link.href=url;
    link.download='datos.json';
    link.click();
    window.URL.revokeObjectURL(url);

  }
}
