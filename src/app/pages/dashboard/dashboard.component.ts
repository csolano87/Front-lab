import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo, Resultado } from 'src/app/interfaces/carga-equipos.interfaces';
import {
  Proceso,
  TotalProcesosPorAprobarBI,
} from 'src/app/interfaces/cargaProceso.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { MuestrasService } from 'src/app/services/muestras.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { multi } from './data';
import { dA } from '@fullcalendar/core/internal-common';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  viewPastel: [number, number] = [700, 250];
  viewBar: [number, number] = [700, 300];
  viewLinear: [number, number] = [800, 400];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    domain: ['#f5f81e', '#5AA454', '#E44D25'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  legend: boolean = false;
  // showLabels: boolean = true;
  showXAxis = true;
  showYAxis = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  yAxisLabel: string = '';
  timeline: boolean = true;
  data: any[] = [];
  public totalAceptas: number = 0;
  public totalIngresadaTubo: number = 0;
  listaporAporbar: TotalProcesosPorAprobarBI[] = [];
  public totalIngresadaRecahzoTubo: number = 0;
  TotalEmergencia: number = 0;
  graficaLinear: any[] = [];
  graficaBarras: any[] = [];
  public totalIngresada: number = 0;
  public listaresultados: Equipo[] = [];
  conteoPorEstadoArray: any[] = [];
  listaday: any[] = [];
  constructor(
    private ordenServicie: OrdenesService,
    private muestraService: MuestrasService,
    private registro: RegistroService,
    private mantenimientoService: MantenimientosService,
    public llenarcomboservice: LlenarCombosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getGraficaPastel();
    this.getGraficaLinea();
    this.getGraficaBarra();
    //this.getOrderRetrasadas();
    this.getOrderRetrasadas().subscribe((result) => {
      console.log('Resultado procesado:', result);
      this.listaday = result;
      console.log('Resultado procesado:', this.listaday);
    });
  }

  get single() {
    console.log(this.conteoPorEstadoArray);
    return this.conteoPorEstadoArray;
  }

  get singleBarras() {
    console.log(this.graficaBarras);
    return this.graficaBarras;
  }
  get multi() {
    // console.log(this.conteoPorEstadoArray);
    return this.graficaLinear;
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  getGraficaPastel() {
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      console.log(ordenes);
      const conteo: { [key: number]: number } = {};
      ordenes.forEach((equipo) => {
      //  if (equipo.estado) {
          const estadoNombre = equipo.estado;
          console.log(estadoNombre);
          if (conteo[estadoNombre]) {
            conteo[estadoNombre]++;
          } else {
            conteo[estadoNombre] = 1;
          }
       // }
      });

      console.log(conteo);

      const nombresEstado = {
        true: 'Creada',
        false:'Eliminada',
        '2': 'Proceso',
        '3': 'Validado',
      };
      const conteoArray = Object.keys(conteo).map((estadoNombre) => ({
        name: nombresEstado[estadoNombre] || estadoNombre,
        value: conteo[estadoNombre],
      }));

      console.log(conteoArray);
      this.conteoPorEstadoArray = conteoArray.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      console.log(this.conteoPorEstadoArray);
    });
  }

  getGraficaLinea() {
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      this.data = ordenes;
      console.log(this.data);
      const datagrafica = this.data.reduce((acc, order) => {
        const atencion = order.tipoatencion.nombre;
        const fecha = order.fechaorden;

        if (!acc[atencion]) {
          acc[atencion] = {
            name: atencion,
            series: [],
          };
        }
        const existingFecha = acc[atencion].series.find(
          (item) => item.name === fecha,
        );
        if (!existingFecha) {
          acc[atencion].series.push({
            name: fecha,
            value: 1,
          });
        } else {
          // Si ya existe la fecha, incrementamos el contador
          existingFecha.value += 1;
        }
        return acc;
      }, {});
      this.graficaLinear = Object.values(datagrafica);
      console.log(this.graficaLinear);
    });
  }

  getGraficaBarra() {
    this.mantenimientoService.getIngresoOrden().subscribe((ordenes) => {
      this.data = ordenes;
      const agrupados = this.data
        .flatMap((orden) => orden.prueba)
        .filter(
          (prueba) => prueba.panelprueba && prueba.panelprueba.ORDEN !== 2,
        )
        .reduce((acc, prueba) => {
          const nombre = prueba.panelprueba.NOMBRE;
          acc[nombre] = (acc[nombre] || 0) + 1;
          return acc;
        }, {});

      console.log(agrupados);
      this.graficaBarras = Object.keys(agrupados).map((estadoNombre) => ({
        name: estadoNombre,
        value: agrupados[estadoNombre],
      }));
      this.graficaBarras.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.graficaBarras);
    });
  }

  getOrderRetrasadas(): Observable<any> {
    const today = new Date();
    const oneDayAgo = new Date(today);
    console.log(oneDayAgo);
    oneDayAgo.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fifteenDaysAgo = new Date(today);
    fifteenDaysAgo.setDate(today.getDate() - 15);

    return this.mantenimientoService.getIngresoOrden().pipe(
      map((ordenes) => {
        const result = {
          dia: 0,
          ayer: 0,
          siete: 0,
          quince: 0,
          treinta: 0,
        };

        ordenes.forEach((order) => {
          const orderDate = new Date(order.fechaorden);

          if (orderDate === today) {
            result.dia += 1;
          } else if (orderDate >= oneDayAgo) {
            result.ayer += 1;
          } else if (orderDate >= sevenDaysAgo) {
            result.siete += 1;
          } else if (orderDate >= fifteenDaysAgo) {
            result.quince += 1;
          } else {
            result.treinta += 1;
          }
        });

        return [
          { category: 'Dia', total: result.dia },
          { category: 'Ayer', total: result.ayer },
          { category: '7 dias', total: result.siete },
          { category: '15 dias', total: result.quince },
          { category: '30 dias', total: result.treinta },
        ]; // Retorna el resultado como observable
      }),
    );
  }
}
