import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pruebas } from 'src/app/interfaces/cargaReportPruebas.interfaces';
import { Prueba, Pruebastock } from 'src/app/interfaces/pruebastock.interfaces';

import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-pruebas',

  templateUrl: './stock-pruebas.component.html',
  styleUrl: './stock-pruebas.component.css',
})
export class StockPruebasComponent implements OnInit {
  listapruebas: Prueba[] = [];
  pruebaForm!: FormGroup;
  selectedFile: File | null = null;
  public desde: number = 0;
  public page!: number;
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1;
  cargando = false;
  constructor(private mantenimientoServices: MantenimientosService) {}
  onFileSelected?(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit() {
    this.getpruebas();
  }
  enviarArchivo() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.mantenimientoServices
      .getCargaExcelpruebas(formData)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
      });
  }
  getpruebas() {
    this.cargando = true;
    this.mantenimientoServices.getPruebastock().subscribe((pruebas) => {
      this.listapruebas = pruebas;
      this.cargando = false;
    });
  }
  borrarPruebas(prueba: Prueba) {
    Swal.fire({
      title: 'Eliminar prueba?',
      text: `Esta seguro que desea eliminar el prueba # ${prueba.IDENTIFICADOR}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mantenimientoServices
          .getDeletePrueba(prueba)
          .subscribe((resp: any) => {
            const { msg } = resp;

            Swal.fire({
              title: 'Prueba eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
}
