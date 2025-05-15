import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { multi } from './data';
import { dA } from '@fullcalendar/core/internal-common';
import { map, Observable, filter } from 'rxjs';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/* import 'swiper/css'; */
import { ListaOrdenes } from '../../interfaces/orden.interface';
import { listaordenes } from 'response';
import {
  LabTests,
  LISLabTest,
} from '../../interfaces/carga-resultOrders.interface';
import {
  Result,
  ResultOrder,
} from '../../interfaces/carga-resultOrders.interface';
import {
  OrdeneMensual,
  OrdenMensual,
} from 'src/app/interfaces/carga-ordenMensual.interface';
import { subscribe } from 'diagnostics_channel';
import { getTime } from 'date-fns';
import { holdReady } from 'jquery';
import { format, differenceInDays } from 'date-fns';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @ViewChild('tableContainer', { static: true })
  tableContainer!: ElementRef<HTMLElement>;
  viewPastel: [number, number] = [900, 450]; /* 700,250 */
  viewBar: [number, number] = [990, 300];
  viewLinear: [number, number] = [550, 400];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  //position:LegendPosition = LegendPosition.Right;
  legendTitle: string = 'Tipo atención';
  schemeType: ScaleType.Ordinal;
  colorScheme: Color = {
    /* 5AA454  --f5f81e */
    domain: ['#f5f81e', '#E44D25', '#7bbfef', '#5AA454'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };
  padding: number = 30;
  //legend: boolean = false;
  // legendTitle: string = 'Tipo Atencion';
  // showLabels: boolean = true;
  showXAxis = true;
  showYAxis = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  timeline: boolean = true;
  data: any[] = [];
  public totalAceptas: number = 0;
  public totalIngresadaTubo: number = 0;
  listaporAporbar: TotalProcesosPorAprobarBI[] = [];
  public totalIngresadaRecahzoTubo: number = 0;
  TotalEmergencia: number = 0;
  graficaPastel: any[] = [];
  graficaLinear: any[] = [];
  graficaBarras: any[] = [];
  public totalIngresada: number = 0;
  public listaresultados: Equipo[] = [];
  conteoPorEstadoArray: any[] = [];
  listaday: any[] = [];
  listaordene: Result[] = [];
  listaordenesmensual: OrdeneMensual[] = [];
  scrollInterval: any;
  constructor(
    private ordenServicie: OrdenesService,
    private muestraService: MuestrasService,
    private registro: RegistroService,
    private mantenimientoService: MantenimientosService,
    public llenarcomboservice: LlenarCombosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    /*  const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(fecha); // 2025-03-13 10:30:00

    this.getOrdenMensual();
    this.getResults();

    this.getGraficaPastel();
    this.getGraficaLinea();
    this.getGraficaBarra();
    this.getOrderRetrasadas();

    this.startAutoScroll();
    const swiper = new Swiper('.swiper', {

      loop: true,
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
      },



      autoplay: { delay: 2500, disableOnInteraction: false },
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    }); */
  }

  get single() {
    return this.conteoPorEstadoArray;
  }
  startAutoScroll() {
    const container = this.tableContainer.nativeElement;

    this.scrollInterval = setInterval(() => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        container.scrollTop = 0;
      } else {
        container.scrollTop += 1;
      }
    }, 20);
  }

  getResults() {
    //this.mantenimientoService.getReporteTotal().subscribe((results) => {
    /*  this.mantenimientoService.getReporteTotalprueba().subscribe((results) => {
      //this.listaordene = results;

      const ok = results.forEach((item) => {
        const labTests = Array.isArray(item.prueba.LabTests.LISLabTest)
          ? item.prueba.LabTests.LISLabTest
          : [item.prueba.LabTests.LISLabTest];

        const resultado = labTests.filter((item) => {
          // Si el GroupID no es '115', lo devuelves
          if (item.TestID == '2047') {
            return true;
          }
          return 0;
        });
      });
      console.log(`xxx=>`, ok);
    }); */
    this.mantenimientoService.getReporteTotalprueba().subscribe((results) => {
      const ok = results
        .map((item) => {
          const numero = item.prueba.SampleID;
          const labTests = Array.isArray(item.prueba.LabTests.LISLabTest)
            ? item.prueba.LabTests.LISLabTest
            : [item.prueba.LabTests.LISLabTest];

          // Filtrar los elementos cuyo TestID sea '2047'
          return labTests.filter((test) => test.TestID === '2047');
        })
        .flat(); // Aplanamos el array para evitar arrays anidados

      console.log(`xxx=>`, ok);
    });
  }

  getOrdenMensual() {
    this.mantenimientoService.getOrdenMensual().subscribe((ordenes) => {
      this.listaordenesmensual = ordenes.filter(
        (item) => item.IsOrderValidated == 'false',
      );
    });
  }

  get singleBarras() {
    return this.graficaBarras;
  }
  get multi() {
    // console.log(this.conteoPorEstadoArray);
    return this.graficaLinear;
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  getGraficaPastel() {
    const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const diferencia = differenceInDays(new Date(), new Date(fecha));

    this.mantenimientoService.getOrdenMensual().subscribe((ordenes) => {
      const dataPastel = ordenes
        /*  .filter((item) => item.RegisterDate === fecha.slice(0, 10)) */
        .reduce((acc, item) => {
          const orden = item.IsOrderValidated;

          acc[orden] = (acc[orden] || 0) + 1;

          return acc;
        }, {});
      console.log(`dataPastel`, dataPastel);

      const totalOrdenes = Object.values(dataPastel).reduce(
        (sum, value) => Number(sum) + Number(value) || 0,
      );

      Object.entries(dataPastel).forEach(([key, value]) => {
        const porcentaje = (
          (Number(value) / Number(totalOrdenes)) *
          100
        ).toFixed(2);

        this.graficaPastel.push({
          nombre: key === 'true' ? 'Validado' : 'Pendiente',
          total: value,
          porcentaje: porcentaje,
        });
      });
      this.graficaPastel.push({
        nombre: 'Generado',
        total: totalOrdenes,
        porcentaje: '100',
      });
      this.graficaPastel.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }),
      );
    });
  }

  getGraficaLinea() {
    this.mantenimientoService.getReporteTotal().subscribe((results) => {
      const datagrafica = results.reduce((acc, order) => {
        results.filter((item) => item.OriginDesc == 'EMERGENCIA');
        order.LabTests.LISLabTest.forEach((item) => {
          const nombrePrueba = item.GroupName;
          console.log(`nombrePrueba`, nombrePrueba);
          const atencion = order.OriginDesc;

          if (!acc[atencion]) {
            acc[atencion] = {
              name: atencion,
              series: [],
            };
          }

          const existingFecha = acc[atencion].series.find(
            (item) => item.name === nombrePrueba,
          );
          if (!existingFecha) {
            acc[atencion].series.push({
              name: nombrePrueba,
              value: 1,
            });
          } else {
            existingFecha.value += 1;
          }
        });

        return acc;
      }, {});

      this.graficaLinear = Object.values(datagrafica);
    });
  }

  getGraficaBarra() {
    this.mantenimientoService.getReporteTotal().subscribe((results) => {
      const agrupados = results
        .flatMap((orden) => orden.LabTests.LISLabTest)

        .reduce((acc, prueba) => {
          const nombre = prueba.GroupName;
          acc[nombre] = (acc[nombre] || 0) + 1;
          return acc;
        }, {});

      this.graficaBarras = Object.keys(agrupados).map((estadoNombre) => ({
        name: estadoNombre,
        value: agrupados[estadoNombre],
      }));
      this.graficaBarras.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  getOrderRetrasadas() {
    const result = {
      dia: 0,
      ayer: 0,
      siete: 0,
      quince: 0,
    };
    const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    this.mantenimientoService.getOrdenMensual().subscribe((ordenes) => {
      this.listaordenesmensual = ordenes.filter(
        (item) => item.IsOrderValidated == 'false',
      );

      this.listaordenesmensual.forEach((order) => {
        const orderDate = order.RegisterDate;

        /*  const diff2 = today.getTime() - orderDate.getTime();
        const diff = Math.floor(diff2 / (1000 * 60 * 60 * 24)); */
        const diff = differenceInDays(new Date(), new Date(orderDate));

        if (diff === 0) {
          result.dia += 1;
        }
        if (diff == 1) {
          result.ayer += 1;
        } else if (diff == 7) {
          result.siete += 1;
        } else {
          result.quince += 1;
        }
      });
      Object.entries(result).forEach(([key, value]) => {
        this.listaday.push({
          category: key, // Nombre de la categoría
          total: value, // Valor correspondiente
        });
      });
    });
  }
}
