import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resultado } from 'src/app/interfaces/cargarResultadoAs400.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',

  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  resultadoForm!: FormGroup;
  page;
  selectedFile: File | null = null;
  listaproductos;
  cargando: boolean = false;
  showDetails: boolean[] = [];
  showPruebasHeader: boolean = false;

  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.showPruebasHeader = this.showDetails.some(detail => detail);

  }

  listaresultados: Resultado[] = [];
  explandedRows: Set<number> = new Set();
  constructor(private mantenimientoservice: MantenimientosService) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  isArray(listaresultados): boolean {
    return Array.isArray(listaresultados.TestID);
  }

  toggleRow(index: number): void {
    if (this.explandedRows.has(index)) {
      this.explandedRows.delete(index);
    } else {
      this.explandedRows.add(index);
    }
  }
  isRowExpanded(index: number): boolean {
    return this.explandedRows.has(index);
  }
  getRowIndex(item: any): number {
    return this.listaresultados.indexOf(item);
  }

  enviarArchivo() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.mantenimientoservice.getResult(formData).subscribe((resp: any) => {
      const { resultados } = resp;
      console.log(resultados);

      // this.listaresultados = resultados;
      this.listaresultados = this.transformResults(resultados);
      this.listaresultados.sort((a,b)=>new Date(a.TechValDate).getTime() - new Date(b.TechValDate).getTime())
      console.log(this.listaresultados);
    });
  }

  transformResults(results: Resultado[]) {
    return results.map((result) => {
      console.log(result);
      // Asegúrate de que TestID siempre sea un array
      if (!Array.isArray(result.TestID)) {
        result.TestID = [
          {
            TestID: result.TestID,
            TechValDate: result.TechValDate,
            TechValHour: result.TechValHour,
          },
        ];
        console.log(result.TestID);
      }
      return result;
    });
  }
}
