import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { pruebas } from '../../../models/cargarperfiles.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';

@Component({
  selector: 'app-reporte-pruebas',

  templateUrl: './reporte-pruebas.component.html',
  styleUrl: './reporte-pruebas.component.css',
})
export class ReportePruebasComponent implements OnInit {
  lista;
  constructor(private mantenimientoService: MantenimientosService) {}

  ngOnInit(): void {
    this.getordenes();
  }

  getordenes() {
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      console.log(ordenes);

      let pruebasPorModelo: {
        [key: string]: { total: number; pruebas: string[] };
      } = {};
      for (let item of ordenes) {
        item.prueba.forEach((it) => {
          console.log(it.panelprueba.ORDEN)
          if (it.panelprueba.ORDEN !== 2) {
            const modeloGrupo = it.panelprueba.modelo.NOMBRE;
            const pruebaNombre = it.panelprueba.NOMBRE;
            if (!pruebasPorModelo[modeloGrupo]) {
              pruebasPorModelo[modeloGrupo] = {
                total: 0,
                pruebas: [],
              };
            }
            if (!pruebasPorModelo[modeloGrupo].pruebas.includes(pruebaNombre)) {
              pruebasPorModelo[modeloGrupo].total++;
              pruebasPorModelo[modeloGrupo].pruebas.push(pruebaNombre);
            }
          }
        });

        console.log(pruebasPorModelo);
        const data = Object.keys(pruebasPorModelo).map((item) => ({
          name: item,
          value: pruebasPorModelo[item],
        }));
this.lista=data;
        console.log(data);
      }
    });
  }
}
