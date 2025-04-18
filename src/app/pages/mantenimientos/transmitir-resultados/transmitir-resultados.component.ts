import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { WorkListOrdenService } from 'src/app/services/work-list-orden.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transmitir-resultados',

  templateUrl: './transmitir-resultados.component.html',
  styleUrl: './transmitir-resultados.component.css',
})
export class TransmitirResultadosComponent {
  @ViewChild('fileInput') fileInput: any;
  listaordenes: any[] = [];
  constructor(
    private worklistordenService: WorkListOrdenService,
    private toastSerivice: ToastrService,
    private router:Router
  ) {}
  onfileInput(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);

          this.listaordenes = jsonData;
          this.resetInput();
        } catch (err) {
          console.error('Error al parsear el JSON:', err);
        }
      };
      reader.readAsText(file);
    }
  }

  resetInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  guardar() {
    this.worklistordenService
      .getTrasmitirresultados(this.listaordenes)
      .subscribe((resp: any) => {

        Swal.fire('success','Se envio el archivo correctamente','success');
       this.router.navigateByUrl('/dashboard/TrasmitirResultados')
      });
  }
}
