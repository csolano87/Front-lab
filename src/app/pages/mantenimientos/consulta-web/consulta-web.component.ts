import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Listaordene } from 'src/app/interfaces/orden.interface';
import { List } from 'src/app/models/listagetlist.module';
import { GetListService } from 'src/app/services/get-list.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-consulta-web',
  templateUrl: './consulta-web.component.html',
  styleUrls: ['./consulta-web.component.css'],
})
export class ConsultaWebComponent {
  fechaActual = new Date().toISOString().split('T');
  @ViewChild('SampleID') SampleID!: ElementRef;
  @ViewChild('PatientID1') patientID1!: ElementRef;
  @ViewChild('apellido') apellido!: ElementRef;
  public listaordene: Listaordene[] = [];
  public desde: number = 0;
  public page!: number;

  cargando :boolean= false;
  descargando = false;
  progreso = 0;
  listau = [];
  /*
  SampleID: string;
  PatientID1: string;
  apellido: string; */
  limpiarCampos() {
    this.patientID1.nativeElement.value = '';
    this.apellido.nativeElement.value = '';
    this.SampleID.nativeElement.value = '';
  }

  constructor(
    private router: Router,
    private tostar: ToastrService,
    private listagetlist: GetListService,
  ) {}

  ///  this.cargarFormulario();}

  buscar(SampleID: string, PatientID1: string, apellido: string) {
    console.log(`eeeeeee`, SampleID);
    this.cargando = true;
    if (!SampleID && !PatientID1 && !apellido) {
      this.tostar.warning('Los campos estan vacios..');
      return;
    } else {

      this.listagetlist
        .buscarPacientes(SampleID, PatientID1, apellido)
        .subscribe(
          ({ listaordenes }) => {
            this.listaordene = listaordenes;
            this.limpiarCampos();

            this.cargando = false;
          },
          (err) => {
            console.log('error', err.error.msg);
            Swal.fire({
              icon: 'error',
              title: 'No existe Ordenes',
              text: err.error.msg,
            });

          },
        );
    }
  }

  buscarTodas(lista: List) {
    console.log(lista);
    this.listagetlist.buscarTodos(lista).subscribe(({ listaordenes }) => {
      this.listaordene = listaordenes;
    });
  }

  pdf2(lista: string) {
    this.descargando = true;

    this.listagetlist.pdfResultado(lista).subscribe((blob: any) => {
      const { pdf } = blob; // Extraemos la URL del PDF del blob
      console.log('URL del PDF:', pdf); // Asegúrate de que pdf sea una URL válida

      const link = document.createElement('a');
      link.href = pdf;
      link.target = '_blank'; // Opcional: abre en otra pestaña
      link.download = pdf; // Nombre del archivo a guardar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);



      this.descargando = false;
    });
  }
  cambinarPaginaOrden(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= 0) {
      this.desde -= valor;
    }
  }
  /*  nextPage() {
   if (!this.page) {
    this.page += 5;
   }
  }


  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  } */
}
