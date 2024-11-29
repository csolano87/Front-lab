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
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { multi } from '../../data';
import { utils } from 'xlsx';
import { Chart } from 'chart.js/auto';
import { ConteoPorEstado } from 'src/app/interfaces/cargatotalEquipoestado.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  multi: any[];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';
  //conteoPorEstadoArray:ConteoPorEstado;
  conteoPorEstadoArray: ConteoPorEstado[] = [];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  public totalAceptas: number = 0;
  public totalIngresadaTubo: number = 0;
  listaporAporbar: TotalProcesosPorAprobarBI[] = [];
  public totalIngresadaRecahzoTubo: number = 0;
  TotalEmergencia: number = 0;
  public totalIngresada: number = 0;
  public listaresultados: Equipo[] = [];
  constructor(
    private ordenServicie: OrdenesService,
    private muestraService: MuestrasService,
    private registro: RegistroService,
    private mantenimientoService: MantenimientosService,
    public llenarcomboservice: LlenarCombosService,
    private router: Router,
  ) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.llenarcomboservice.getEquipo().subscribe((equipos) => {
      console.log(equipos);
      const conteo: { [key: string]: number } = {};
      equipos.forEach((equipo) => {
        if (equipo.historicoestado.length > 0) {
          const estadoNombre = equipo.historicoestado[0].estado.NOMBRE;
          if (conteo[estadoNombre]) {
            conteo[estadoNombre]++;
          } else {
            conteo[estadoNombre] = 1;
          }
        }
      });
      const conteoArray = Object.keys(conteo).map((estadoNombre) => ({
        nombre: estadoNombre,
        total: conteo[estadoNombre]
      }));
    
      console.log(conteoArray);
      this.conteoPorEstadoArray = conteoArray; 
    });

  /*   new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }); */
  }
}
