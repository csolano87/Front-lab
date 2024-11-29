import { Component, OnInit } from '@angular/core';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report-qc',
  templateUrl: './report-qc.component.html',
  styleUrls: ['./report-qc.component.css'],
})
export class ReportQCComponent implements OnInit {
  page: number = 1;
  registrosFiltrados: any[];

  constructor(private llenarcomboService: LlenarCombosService) {}
  dias: number[] = Array.from({ length: 31 }, (_, index) => index + 1);
  pruebas: string[] = ['UREA', 'COLIN', 'GGT'];
  ngOnInit(): void {}
  selectedFile: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.llenarcomboService.getQC(formData).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const urlArchivo = window.URL.createObjectURL(blob);
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = urlArchivo;
        enlaceDescarga.download = 'Reporte-QC.csv'; // Reemplaza con el nombre deseado para el archivo CSV
        enlaceDescarga.click();
        window.URL.revokeObjectURL(urlArchivo);
      },
      (error) => {
        // Aquí puedes manejar los errores
        console.error(error);
      },
    );
  }
}
