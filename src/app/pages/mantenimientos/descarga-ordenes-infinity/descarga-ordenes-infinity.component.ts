import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';

@Component({
  selector: 'app-descarga-ordenes-infinity',

  templateUrl: './descarga-ordenes-infinity.component.html',
  styleUrl: './descarga-ordenes-infinity.component.css',
})
export class DescargaOrdenesInfinityComponent implements OnInit {
  constructor(private mantenimientoService: MantenimientosService) {}
  cargando: boolean = false;
  listaresultado: any[] = [];
  public page!: number;

  ngOnInit(): void {}

  getResults(fechaIn: string) {
    this.cargando = true;

    this.mantenimientoService
      .getPruebaEspeciales(fechaIn)
      .subscribe((pruebaEspecial) => {
        this.listaresultado = pruebaEspecial;

        this.cargando = false;
      });
  }
}
