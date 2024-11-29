import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/interfaces/stock.interface';
import { cargaStock } from 'src/app/models/cargatotalSotck.module';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks',
  //standalone: true,
  // imports: [],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent implements OnInit {
  listaSotck: Stock[] = [];
  public listaStockTemp: Stock[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  public cargando: boolean = true;
  fechaActual: Date = new Date();  
  showDetails: boolean[] = [];
  showPruebasHeader: boolean = false;
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getStock();
    // this.calcularMeses();
  }

  getStock() {
    this.cargando = true;
    this.stockService.getStock().subscribe((stock) => {
      this.listaSotck = stock;
      this.calcularMesesParaTodos();
      this.cargando = false;
    });
  }
  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.showPruebasHeader = this.showDetails.some((detail) => detail);
  }
  getAlertClass(caducidad: Date): string {
    const meses = this.calcularMeses(caducidad);
    if (meses <= 3) {
      return 'alerta-rojo';
    } else if (meses > 3 && meses <= 11) {
      return 'alerta-amarillo';
    } else {
      return 'alerta-verde';
    }
  }
  calcularMeses(caducidad: Date) {
    console.log(this.fechaActual);
    const fechaconvertida = new Date(caducidad);
    const miliSegundos = fechaconvertida.getTime() - this.fechaActual.getTime();

    const diferenciaMeses = miliSegundos / (1000 * 3600 * 24 * 30);
    return Math.round(diferenciaMeses);
  }

  calcularMesesParaTodos() {
    this.listaSotck.forEach((item) => {
      console.log(item.detalles)
     // const fecha=item.detalles.map((cad)=>cad.caducidad)
      console.log(item)
     // this.calcularMeses();
    });
  }
  obtenerFechaActualFormateada() {
    return this.fechaActual.toISOString().split('T')[0];
  }
  obtenerFechaCaducidadFormateada(caducidad: Date):any {
    console.log(new Date(caducidad).toLocaleDateString('en-US'))
   // const date = caducidad.getDate()
    //console.log(date)
    return new Date(caducidad).toLocaleDateString('en-US'); // Obtenemos solo la parte de la fecha
  }

  buscarProductos(termino: string) {
    return termino.length === 0
      ? (this.listaSotck = this.listaStockTemp)
      : this.stockService.getByfiltroStock(termino).subscribe((resultados) => {
          this.listaSotck = resultados;
        });
  }
  descargarPDf(){
    this.stockService.getreportePdfStock().subscribe(  (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ReporteStock.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
