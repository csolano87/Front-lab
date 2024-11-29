import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportacionService } from 'src/app/services/importacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-ordenes',

  templateUrl: './carga-ordenes.component.html',
  styleUrl: './carga-ordenes.component.css'
})
export class CargaOrdenesComponent {
  public desde: number = 0;
  public page!: number;
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1;
  cargando = false;
  ordenesForm!:FormGroup;
  selectedFile: File | null = null;
  constructor(
    
    private inportService: ImportacionService,
  ) {}
  onFileSelected?(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enviarArchivo() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.inportService
      .getCargaExcelOrdenes(formData)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
      });
  }
}
