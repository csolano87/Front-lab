import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { pruebas } from '../../../models/cargarperfiles.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';
import { Estado } from '../../../interfaces/cargarEstado.interface';
import { Item } from '../../../interfaces/pedidos-stocks.interface';
import { cargaEnvase } from '../../../interfaces/cargaEnvase.interface';

@Component({
  selector: 'app-reporte-pruebas',

  templateUrl: './reporte-pruebas.component.html',
  styleUrl: './reporte-pruebas.component.css',
})
export class ReportePruebasComponent implements OnInit {
  lista;
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  cargando: boolean = false;
  constructor(private mantenimientoService: MantenimientosService) {}

  ngOnInit(): void {
    this.getordenes();
  }

  getordenes() {
    this.cargando = true;
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      console.log(ordenes);
      const agrupada = ordenes.reduce((acc, item) => {
        const genero = item.paciente.sexo;

        item.prueba
          /*  .flatMap((orden) => orden) */
          .filter((it) => it.panelprueba.ORDEN !== 2)
          .forEach((it) => {
            const modeloGrupo = it.panelprueba.modelo.NOMBRE;
            const nombre = it.panelprueba.NOMBRE;
            const codigo = it.panelprueba.CODIGO;

            if (!acc[modeloGrupo]) {
              acc[modeloGrupo] = {
                prueba: [],
              };
            }

            let existente = acc[modeloGrupo].prueba.find(
              (p) => p.codigo === codigo,
            );

            if (existente) {
              existente.cantidad++;
              existente[genero] = (existente[genero] || 0) + 1;
            } else {
              acc[modeloGrupo].prueba.push({
                /*  genero,
                codigo,
                nombre,
                cantidad: 1, */
                codigo,
                nombre,
                cantidad: 1,
                M: genero === 'M' ? 1 : 0,
                F: genero === 'F' ? 1 : 0,
                NN: genero === 'NN' ? 1 : 0,
              });
            }
          });
        return acc;
      }, {});
      /*   const agrupada = ordenes
        .flatMap((orden) => orden.prueba)
        .filter((it) => it.panelprueba.ORDEN !== 2)
        .reduce((acc, prueba) => {
          const modeloGrupo = prueba.panelprueba.modelo.NOMBRE;
          const nombre = prueba.panelprueba.NOMBRE;
          const codigo = prueba.panelprueba.CODIGO;

          if (!acc[modeloGrupo]) {
            acc[modeloGrupo] = {
              prueba: [],
            };
          }
          console.log(acc[modeloGrupo]);
          let existente = acc[modeloGrupo].prueba.find(
            (p) => p.nombre === nombre,
          );
          if (existente) {
            existente.cantidad++;
          } else {
            acc[modeloGrupo].prueba.push({ codigo, nombre, cantidad: 1 });
          }

          return acc;
        }, {}); */

      console.log(agrupada);

      const data = Object.keys(agrupada).map((item) => ({
        name: item,
        value: agrupada[item],
      }));
      this.lista = data;
      console.log(data);
      this.cargando = false;
      /*    const agrupadaGenero = ordenes.reduce((acc, item) => {
        const genero = item.paciente.sexo;

        item.prueba
          .flatMap((orden) => orden)
          .forEach((it) => {
            const nombre = it.panelprueba.NOMBRE;
            const codigo = it.panelprueba.CODIGO;

            if (!acc[genero]) {
              acc[genero] = {
                pruebas: [],
              };
            }

            let existente = acc[genero].pruebas.find((p) => p.codigo === codigo);

            if (existente) {
              existente.cantidad++;
            } else {
              acc[genero].pruebas.push({ codigo, nombre, cantidad: 1 });
            }
          });
        return acc;
      }, {});
      console.log(agrupadaGenero);*/
    });
  }

  contarGenero(pru: any, genero: string): number {
    console.log(genero);
    console.log(pru.genero === genero);
    return pru.genero === genero ? pru.cantidad : 0;
  }
}
