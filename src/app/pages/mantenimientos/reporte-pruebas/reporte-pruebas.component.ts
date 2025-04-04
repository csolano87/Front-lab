import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { pruebas } from '../../../models/cargarperfiles.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';
import { Estado } from '../../../interfaces/cargarEstado.interface';
import { Item } from '../../../interfaces/pedidos-stocks.interface';
import { cargaEnvase } from '../../../interfaces/cargaEnvase.interface';
import { Ordene } from 'src/app/interfaces/cargaIngresoordenes.interface';
import { listaordenes } from 'response';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import { Result } from 'src/app/interfaces/carga-resultOrders.interface';
import { LabTests } from '../../../interfaces/carga-resultOrders.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-reporte-pruebas',

  templateUrl: './reporte-pruebas.component.html',
  styleUrl: './reporte-pruebas.component.css',
})
export class ReportePruebasComponent implements OnInit {
  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;
  lista;
  listaordenes: Result[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  cargando: boolean = false;
  total: number;
  constructor(private mantenimientoService: MantenimientosService) {}

  ngOnInit(): void {
    this.getordenes();
    this.getTotalPrueba();
  }

  getordenes() {
    /*  this.cargando = true;
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      const agrupada = ordenes.reduce((acc, item) => {
        const genero = item.paciente.sexo;

        item.prueba

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




      const data = Object.keys(agrupada).map((item) => ({
        name: item,
        value: agrupada[item],
      }));
      this.lista = data; */

    this.cargando = false;
    // });
  }

  validar(item: any) {
    console.log(`ert=>`, item);
    /*     return item.codigo.includes(9594)
     */
  }
  getTotalPrueba() {
    this.mantenimientoService.getReporteTotalprueba().subscribe((results) => {
      const agrupada = results.reduce((acc, item) => {
        const genero = item.genero;
        const labTests = Array.isArray(item.prueba.LabTests.LISLabTest)
          ? item.prueba.LabTests.LISLabTest
          : [item.prueba.LabTests.LISLabTest];


          const resultado =

          labTests.filter(item => {
            // Si el GroupID no es '115', lo devuelves
            if (item.GroupID !== '115'&& item.GroupID !=='123' && item.GroupID !=='122') {
              return true;
            }
            // Si el GroupID es '115', solo devuelves el TestID que sea '9594'
            return item.TestID == "9594" || item.TestID =="7510" || item.TestID =="4501" ;//4501
          });

          resultado.forEach((it) => {




          const modeloGrupo =  it.GroupName  ;
          const nombre = it.TestName;
          const codigo = it.TestID;

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
              codigo,
              nombre,
              cantidad: 1,
              M: genero === 'M' ? 1 : 0,
              F: genero === 'F' ? 1 : 0,
              NN: genero === '' ? 1 : 0,
            });
          }
        });

        return acc;
      }, {});

      const data = Object.keys(agrupada).map((item) => ({
        name: item,
        value: agrupada[item],
      }));
      this.lista = data;

      this.cargando = false;
      //results.LabTests
    });
  }
  contarGenero(pru: any, genero: string): number {
    console.log(pru.genero === genero);
    return pru.genero === genero ? pru.cantidad : 0;
  }

  CalcularTotal(lista: any) {
    return lista.reduce((acc, item) => acc + item.cantidad, 0);
  }

  CalcularSubtotalgrupoHombre(lista: any) {
    return lista.reduce((acc, item) => acc + item.M, 0);
  }

  CalcularSubtotalgrupoMujer(lista: any) {
    return lista.reduce((acc, item) => acc + item.F, 0);
  }

  CalcularSubtotalgrupoNN(lista: any) {
    return lista.reduce((acc, item) => acc + item.NN, 0);
  }
  CalcularTotalGeneral(lista: any) {
    console.log(`lista=>`, lista);
    return lista.reduce((totalGeneral, element) => {
      const subtotal = element.value.prueba.reduce(
        (acc, item) => acc + item.cantidad,
        0,
      );
      return totalGeneral + subtotal;
    }, 0);
  }

  CalcularTotalGeneralM(lista: any) {
    return lista.reduce((totalGeneral, element) => {
      const subtotal = element.value.prueba.reduce(
        (acc, item) => acc + item.M,
        0,
      );
      return totalGeneral + subtotal;
    }, 0);
  }

  CalcularTotalGeneralF(lista: any) {
    return lista.reduce((totalGeneral, element) => {
      const subtotal = element.value.prueba.reduce(
        (acc, item) => acc + item.F,
        0,
      );
      return totalGeneral + subtotal;
    }, 0);
  }

  GenerarPdf(lista: any) {
    const elemento = this.contenidoPDF.nativeElement;
    html2pdf()
      .set({
        margin: 10,
        filename: 'mi_documento.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(elemento)
      .save();
  }

}
