import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/carga-resultOrders.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { LabTests } from '../../../interfaces/cargaPruebatotalInfinity.interface';
import { GetListService } from 'src/app/services/get-list.service';
import Swal from 'sweetalert2';
import { PruebaEspecial } from 'src/app/interfaces/cargarPruebasEspeciales.interface';

@Component({
  selector: 'app-consulta-pruebas-especiales',

  templateUrl: './consulta-pruebas-especiales.component.html',
  styleUrl: './consulta-pruebas-especiales.component.css',
})
export class ConsultaPruebasEspecialesComponent implements OnInit {
  fechaActual: string = new Date().toISOString().split('T')[0];
  cargando: boolean = false;
  listaresultado: PruebaEspecial[] = [];
  public page!: number;
  constructor(
    private mantenimientoService: MantenimientosService,
    private listagetlist: GetListService,
  ) {}
  ngOnInit(): void {
   // this.getResults(this.fechaActual);
  }
  getResults(fechaIn: string) {
    this.cargando = true;

    this.mantenimientoService
      .getPruebaEspeciales(fechaIn)
      .subscribe((pruebaEspecial) => {
        this.listaresultado = pruebaEspecial;

        this.cargando = false;
      });
  }

  pdfResultado(sampleId: string) {
    this.listagetlist.pdfResultado(sampleId).subscribe((resp: any) => {
      const url = resp.pdf;

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('target', '_blank');
      tempLink.click();
    });
  }
  mailResultado(item: any) {
    console.log(`item`, item);

    Swal.fire({
      title: 'Ingrese correo electronico',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,

      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          ...item,
          correo: result.value,
        };
        this.listagetlist.mailResultado(data).subscribe(
          (resp: any) => {
            console.log(resp);
            const { msg } = resp;
            Swal.fire({
              title: 'Correo Enviado!',
              text: msg,
              icon: 'success',
            });
          },
          (err) => {
            console.log('error', err.error.msg);
            Swal.fire({
              icon: 'error',
              title: 'Error en el envio de correo',
              text: err.error.msg,
            });
          },
        );
      }
      /* console.log(`correo electronico`,result)

      const data ={
        ...item ,
        correo:result.value
      }
      this.listagetlist.mailResultado(data).subscribe((resp: any) => {
        console.log(resp);
      }); */
    });

    /*   this.listagetlist.mailResultado(item).subscribe((resp: any) => {
      console.log(resp);
    }); */
  }
}
