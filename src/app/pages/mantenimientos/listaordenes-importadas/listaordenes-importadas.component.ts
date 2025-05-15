import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { WorkListOrdenService } from 'src/app/services/work-list-orden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaordenes-importadas',

  templateUrl: './listaordenes-importadas.component.html',
  styleUrl: './listaordenes-importadas.component.css',
})
export class ListaordenesImportadasComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  fechaActual = new Date().toISOString().split('T')
  cargando = false;
  listaordenes: any[] = [];
  page: number = 1;
  count: number = 10;
  ordenImportForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private worklistOrden: WorkListOrdenService,
    private router: Router,
  ) {}

  get pruebas() {
    return this.ordenImportForm.get('pruebas') as FormArray;
  }
  ngOnInit(): void {

    console.log(this.fechaActual)
  }
  resetInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  guardar() {
    this.worklistOrden
      .getImportOrden(this.listaordenes)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: msg,
          timer: 2000,
        });
       this.router.navigateByUrl("/dashboard/ExportarOrdenes")
      });
  }
  borrarItem(i: number) {
    this.listaordenes.splice(i, 1);
  }
  cancelar() {
    this.listaordenes=[];
  }
  onFileSelected(event: any): void {this.cargando=true;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);

          this.listaordenes = jsonData;
          this.cargando=false;
         // this.resetInput();
        } catch (err) {
          console.error('Error al parsear el JSON:', err);
        }
      };
      reader.readAsText(file);
    }
  }
}
