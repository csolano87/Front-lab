import { Component, OnInit } from '@angular/core';
import { OrdenCalendar } from 'src/app/models/as400.module';
import { Router } from '@angular/router';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-agendados',
  templateUrl: './agendados.component.html',
  styleUrls: ['./agendados.component.css'],
})
export class AgendadosComponent implements OnInit {
  constructor(
    private agendamientoService: AgendamientoService,
    private router: Router,
  ) {}

  dataExterna: OrdenCalendar[] = [];

  ordenBorrarActivo = 1;
  datafiltroExterna: OrdenCalendar[] = [];
  ordenEncontrada = false;
  page: number;

  selectedImage: File;
  base64Image: string | undefined;

  ngOnInit(): void {
    this.agendamientoService.cargarOrdenesExterna().subscribe(({ ordenes }) => {
      this.dataExterna = ordenes;
    });

    this.convertImageToBase64();

    this.escucharOrden();
    this.ordenEliminada();
  }

  eliminarOrden(orden) {
    console.log(`//////************`, orden.id);
    const storedOption = localStorage.getItem('selectedOption');
    Swal.fire({
      title: 'Seleccione una impresora',
      input: 'select',
      inputOptions: {
        Zebra: {
          ZBR1: 'Recepcion 1',
          ZBR2: 'Recepcion 2',
        },
      },
      inputValue: storedOption, // Establecer la opción almacenada como valor predeterminado
      inputPlaceholder: 'Seleccione una impresora',
      showCancelButton: true,

      inputAttributes: {
        style: 'font-size: 16px; margin: 10px auto;width:90%;', // Ajusta estos valores según tus preferencias
      },
      preConfirm: (selectedValue) => {
        localStorage.setItem('selectedOption', selectedValue);
        orden.CODIMPRESORA = selectedValue;
        const data = {
          ...orden,
        };

        console.log(`******agregar impre***`, data);
        this.agendamientoService
          .actualizarOrden(data)
          .subscribe((resp: any) => {
            const { msg } = resp;
            Swal.fire('Actualizado', `${msg}`, 'success');
          });
      },
    });
  }

  convertImageToBase64() {
    // Ruta de la imagen en la carpeta assets
    const imagePath = '../assets/ieeslogo-removebg-preview.png';

    // Carga la imagen como un objeto Image
    const img = new Image();
    img.src = imagePath;

    // Espera a que la imagen se cargue completamente
    img.addEventListener('load', () => {
      // Crea un lienzo (canvas) para dibujar la imagen
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Dibuja la imagen en el lienzo
      const context = canvas.getContext('2d');
      context?.drawImage(img, 0, 0);

      // Convierte el lienzo a base64
      this.base64Image = canvas.toDataURL('image/png');
    });
  }

  pdf() {
    const data = this.dataExterna.map((externa) => {
      return {
        cedula: externa.DLCEDU,
        pacientes: externa.DLAPEL,
        fecha: externa.FECHA,
        sala: externa.DLCPRO,
      };
    });

    const documentDefinition = {
      content: [
        { text: 'Lista de Agendados', style: 'header' },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Cédula', 'Pacientes', 'Fecha cita', 'Origen'],
              ...data.map((row) => [
                row.cedula,
                row.pacientes,
                row.fecha,
                row.sala,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download('lista_trabajo.pdf');
  }

  pdf2(orden) {
    Swal.fire({
      title: 'Seleccione  fechas para generar el certificado',
      html:
        '<label for="departure-date">Fecha Inicio:</label>' +
        '<input type="datetime-local" id="departure-date" class="swal2-input" min="' +
        new Date().toISOString().split('T')[0] +
        '">' +
        '<label for="return-date">Fecha final:</label>' +
        '<input type="datetime-local" id="return-date" class="swal2-input" min="' +
        new Date().toISOString().split('T')[0] +
        '">',
      focusConfirm: false,
      preConfirm: () => {
        const departureDate = (
          document.getElementById('departure-date') as HTMLInputElement
        ).value;
        const returnDate = (
          document.getElementById('return-date') as HTMLInputElement
        ).value;

        if (!departureDate || !returnDate) {
          Swal.showValidationMessage('Campos requerido');
          return null; // Return null to indicate a failed validation
        } else if (new Date(departureDate) > new Date(returnDate)) {
          Swal.showValidationMessage(
            'Return date must be after departure date',
          );
          return null; // Return null to indicate a failed validation
        } else {
          return { departureDate, returnDate }; // Return the selected dates
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
    /*     Swal.fire(
          `Departure Date: ${result.value.departureDate}<br>Return Date: ${result.value.returnDate}`,
        );
 */
        const base64Image = this.base64Image;
        try {
          console.log(`********3*********`, base64Image);
          const certificado = {
         
            header: function (currentPage, pageCount) {
              return [
                {
                  columns: [
                    {
                      width: 50, // Ancho de la columna para la imagen
                      stack: [
                        {
                          image: base64Image, // Debes proporcionar la imagen en formato base64
                          width: 100, // Ancho de la imagen
                          height: 100, // Altura de la imagen
                        },
                      ],
                      alignment: 'left', // Alinea la columna a la izquierda
                    },
                    {
                      width: '*', // Ancho de la columna para el texto (toma el espacio restante)
                      text: 'Hospital General de Portoviejo',
                      fontSize: 18,
                      alignment: 'right', // Alinea el texto a la derecha
                      margin: [10, 0, 30, 0], // Ajusta los márgenes izquierdos para separar el texto de la imagen
                    },
                  ],
                },
              ];
            },
            content: [
              { text: 'CERTIFICADO DE ASISTENCIA', style: 'header' },

              {
                text: `Certifico a  ${orden.DLAPEL} con C.I: ${orden.DLCEDU} asitio a realizarse exámenes el día ${result.value.departureDate.slice(0, 10)} - ${result.value.departureDate.slice(11, 16)} hasta ${result.value.returnDate.slice(0, 10)} -${result.value.returnDate.slice(11, 16)}`,
                style: 'nombre',
              },
            ],
            styles: {
              header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [20, 100, 0, 120],
              },
              nombre: {
                fontSize: 15,

                alignment: 'justify',
                margin: [50, 10, 50, 80],
              },
              diagnostico: {
                fontSize: 12,
                italics: true,
              },
              text: {
                fontSize: 18,
                alignment: 'right',
                margin: [0, 0, 40, 0],
              },
            },
          };

          pdfMake.createPdf(certificado).download('certificado_asistencia.pdf');
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  buscar(IDENTIFICADOR: string, SALA: string, FECHA: string) {
    console.log({ IDENTIFICADOR });

    this.agendamientoService
      .buscarFiltroOrdenes(IDENTIFICADOR, SALA, FECHA)
      .subscribe((resultados) => {
        this.dataExterna = resultados;
      });
  }

  borrarOrden(orden) {
    if (orden.ESTADO != 1) {
      return;
    }
    Swal.fire({
      title: 'Eliminar Orden?',
      text: `Esta seguro que desea eliminar la orden ${orden.DLHIST}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      if (result.value) {
        this.agendamientoService.eliminarOrden(orden).subscribe(
          (resp) => {
            Swal.fire(
              'Orden eliminada',
              `${orden.DLHIST} a sido eliminada corectamente`,
              'success',
            );
            //  this.agendamientoService.emit('orden-eliminada', {})
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops.....',
              text: err.error.msg,
            });
          },
        );
      }
    });
  }

  escucharOrden() {
    this.agendamientoService
      .listen('numero-generado')
      .subscribe((ordenActualizada: any) => {
        console.log(`*******actualiza**numero*`, ordenActualizada);
        this.dataExterna = ordenActualizada;
      });
  }

  ordenEliminada() {
    this.agendamientoService
      .listen('orden-eliminada')
      .subscribe((ordenEliminada: any) => {
        console.log(`*******eliminada**orden*`, ordenEliminada);
        this.dataExterna = ordenEliminada;
      });
  }
  borrarFiltro(IDENTIFICADOR, SALA, FECHA) {
    IDENTIFICADOR.value = '';
    //ESTADO.value = '';
    SALA.value = '';
    FECHA.value = '';
  }
}
