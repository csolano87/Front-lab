import { Component, ViewChild } from '@angular/core';
import { event } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { WorkListOrdenService } from 'src/app/services/work-list-orden.service';

@Component({
  selector: 'app-transmitir-resultados',

  templateUrl: './transmitir-resultados.component.html',
  styleUrl: './transmitir-resultados.component.css',
})
export class TransmitirResultadosComponent {
  @ViewChild('fileInput') fileInput: any;
  constructor(
    private worklistordenService: WorkListOrdenService,
    private toastSerivice: ToastrService,
  ) {}
  onfileInput(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);
          this.resetInput();
          this.worklistordenService
            .getTrasmitirresultados(jsonData)
            .subscribe((resp: any) => {});
        } catch (err) {
          console.error('Error al parsear el JSON:', err);
        }
      };
      reader.readAsText(file);
    } else {
      this.toastSerivice.error('Por favor, seleccione un archivo JSON válido.');
      this.resetInput();
    }
  }

  resetInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
