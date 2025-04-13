import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { WorkListOrden } from 'src/app/interfaces/cargarWorkListOrden.interface';
import { Ordene } from 'src/app/interfaces/cargarWorkListOrden.interface';
import { WorkListOrdenService } from 'src/app/services/work-list-orden.service';

@Component({
  selector: 'app-listaordenesexportar',

  templateUrl: './listaordenesexportar.component.html',
  styleUrl: './listaordenesexportar.component.css',
})
export class ListaordenesexportarComponent implements OnInit {
  fechaActual = new Date();
  listaordenes: Ordene[] = [];
  cargando = false;
  page: number = 1;
  count: number = 10;

  constructor(private worklistOrdenService: WorkListOrdenService) {}
  ngOnInit(): void {
    this.getOrdenes(this.fechaActual[0]);
  }
  getOrdenes(fecha: string) {
    this.worklistOrdenService.getOrdenInfinity(fecha).subscribe((ordenes) => {
      this.listaordenes = ordenes;
    });
  }
  borrarItem(i: number) {}
  cancelar() {}
  exportarData() {
    const jsonStr = JSON.stringify(this.listaordenes, null, 2);
    console.log(`jsonStr`, jsonStr);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = format(this.fechaActual, 'yyyy-MM-dd HH:mm:ss');
    link.download = `${fileName}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
