import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listaordene } from 'src/app/interfaces/orden.interface';
import { List } from 'src/app/models/listagetlist.module';
import { GetListService } from 'src/app/services/get-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-web',
  templateUrl: './consulta-web.component.html',
  styleUrls: ['./consulta-web.component.css'],
})
export class ConsultaWebComponent {
  public listaordene: Listaordene[] = [];
  public desde: number = 0;
  public page!: number;
  cargando = false;
  descargando = false;
  progreso = 0;
  listau = [];

  SampleID: string;
  PatientID1: string;
  apellido: string;

  get cedulaNoValido() {
    return (
      this.buscarform?.get('PatientID1')!.invalid &&
      this.buscarform?.get('PatientID1')!.touched
    );
  }
  get SampleNoValido() {
    return (
      this.buscarform?.get('SampleID')!.invalid &&
      this.buscarform?.get('SampleID')!.touched
    );
  }
  get valeNoValido() {
    return (
      this.buscarform?.get('vale')!.invalid &&
      this.buscarform?.get('vale')!.touched
    );
  }
  buscarform!: UntypedFormGroup;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private listagetlist: GetListService,
  ) {
    this.crearFormulario();
    this.apellido = '';
    this.PatientID1 = '';
    this.SampleID = '';
  }
  ///  this.cargarFormulario();}

  crearFormulario() {
    this.buscarform = this.fb.group({
      SampleID: ['', [Validators.minLength(10)]],
      PatientID1: ['', [Validators.required, Validators.minLength(10)]],
      todos: ['', [Validators.maxLength(5)]],
    });
  }
  /* cargarFormulario(){
    this.buscarform.reset({
      SampleID:'',
      PatientID2:'',
    })
  } */

  buscar(SampleID: string, PatientID1: string, apellido: string) {
    this.cargando = true;
    this.listagetlist.buscarPacientes(SampleID, PatientID1, apellido).subscribe(
      ({ listaordenes }) => {
        this.listaordene = listaordenes;
        this.cargando = false;

        this.buscarform.reset({
          SampleID: '',
          PatientID1: '',
          apellido: '',
        });
      },
      (err) => {
        console.log('error', err.error.msg);
        Swal.fire({
          icon: 'error',
          title: 'No existe Ordenes',
          text: err.error.msg,
        });
        this.buscarform.reset({
          SampleID: '',
          PatientID1: '',
        });
        this.cargando = false;
      },
    );
  }
  camposLlenos(): boolean {
    return (
      this.apellido.trim() !== '' ||
      this.SampleID.trim() !== '' ||
      this.PatientID1.trim() !== ''
    );
  }

  buscarTodas(lista: List) {
    console.log(lista);
    this.listagetlist.buscarTodos(lista).subscribe(({ listaordenes }) => {
      this.listaordene = listaordenes;
      //this.buscarform.reset();
      this.buscarform.reset({
        SampleID: '',
        PatientID1: '',
        apellido: '',
      });
    });
  }

  pdf2(lista: List) {
    console.log(lista);
    this.descargando = true;

    this.listagetlist.pdf2(lista).subscribe((resp: any) => {
      const url = resp.pdf;
      /* console.log(url.length)
        if (url === 1 || url.length <= 1) {
          Swal.fire(
            {

              title:"Oops",
              titleText:"Tus resultados no se encuentran disponibles",
              icon:"warning",
             // iconColor:"#353535",
              confirmButtonColor: "#353535",
            }
            
          
           
           );


        } else { */

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('target', '_blank');
      tempLink.click();

      // }
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
