import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  DateInput,
  DateSelectArg,
  EventInput,
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { OrdenCalendar } from 'src/app/models/as400.module';
import Swal from 'sweetalert2';
import { cargarExternaCalendar } from 'src/app/interfaces/carga-agendamiento.interface';
import { ordenexterna } from 'src/app/models/ordenexterna.module';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css'],
})
export class AgendamientoComponent implements OnInit {
  ordencalendar: ordenexterna[] = [];
  ordenEncontrada = false;
  selectedDateString2: string = '';
  selectedDateString: string = '';
  calendarEvents: EventInput[] = [];
  @ViewChild('calendarOptions', { static: true }) fullCalendarRef: ElementRef;
  AgendarForm!: UntypedFormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    showNonCurrentDates: false,
    fixedWeekCount: false,
    height: 700,
    contentHeight: 500,

    locales: allLocales,
    selectable: true,
    select: this.handleDateSelect.bind(this), // Event handler for date selection
    locale: 'es', // the initial locale,
    events: this.calendarEvents,
    eventContent: this.renderEventContent.bind(this),
    // dateClick: this.handleDateClick.bind(this), // Evento dateClick
  };
  get DLCBEN() {
    return (
      this.AgendarForm?.get('DLCBEN')!.invalid &&
      this.AgendarForm?.get('DLCBEN')!.touched
    );
  }

  get DLCACT() {
    return (
      this.AgendarForm?.get('DLCACT')!.invalid &&
      this.AgendarForm?.get('DLCACT')!.touched
    );
  }
  get DLCDEP() {
    return (
      this.AgendarForm?.get('DLCDEP')!.invalid &&
      this.AgendarForm?.get('DLCDEP')!.touched
    );
  }
  get DLCOTR() {
    return (
      this.AgendarForm?.get('DLCOTR')!.invalid &&
      this.AgendarForm?.get('DLCOTR')!.touched
    );
  }
  get DLCEDU() {
    return (
      this.AgendarForm?.get('DLCEDU')!.invalid &&
      this.AgendarForm?.get('DLCEDU')!.touched
    );
  }
  get DLCPRO() {
    return (
      this.AgendarForm?.get('DLCPRO')!.invalid &&
      this.AgendarForm?.get('DLCPRO')!.touched
    );
  }
  get DLCSER() {
    return (
      this.AgendarForm?.get('DLCSER')!.invalid &&
      this.AgendarForm?.get('DLCSER')!.touched
    );
  }
  get DLCMED() {
    return (
      this.AgendarForm?.get('DLCMED')!.invalid &&
      this.AgendarForm?.get('DLCMED')!.touched
    );
  }
  get DLCDIS() {
    return (
      this.AgendarForm?.get('DLCDIS')!.invalid &&
      this.AgendarForm?.get('DLCDIS')!.touched
    );
  }

  get DLNUOR() {
    return (
      this.AgendarForm?.get('DLNUOR')!.invalid &&
      this.AgendarForm?.get('DLNUOR')!.touched
    );
  }

  get DLAPEL() {
    return (
      this.AgendarForm?.get('DLAPEL')!.invalid &&
      this.AgendarForm?.get('DLAPEL')!.touched
    );
  }
  get DLNOMB() {
    return (
      this.AgendarForm?.get('DLNOMB')!.invalid &&
      this.AgendarForm?.get('DLNOMB')!.touched
    );
  }
  get DLSEXO() {
    return (
      this.AgendarForm?.get('DLSEXO')!.invalid &&
      this.AgendarForm?.get('DLSEXO')!.touched
    );
  }

  get DLFECN() {
    return (
      this.AgendarForm?.get('DLFECN')!.invalid &&
      this.AgendarForm?.get('DLFECN')!.touched
    );
  }
  get DLHIST() {
    return (
      this.AgendarForm?.get('DLHIST')!.invalid &&
      this.AgendarForm?.get('DLHIST')!.touched
    );
  }
  get DLTIDO() {
    return (
      this.AgendarForm?.get('DLTIDO')!.invalid &&
      this.AgendarForm?.get('DLTIDO')!.touched
    );
  }
  get FECHA() {
    return (
      this.AgendarForm?.get('FECHA')!.invalid &&
      this.AgendarForm?.get('FECHA')!.touched
    );
  }

  get DLCEXAS() {
    return this.AgendarForm.get('DLCEXAS') as UntypedFormArray;
  }
  constructor(
    private ordenesService: OrdenesService,
    public agendamientoService: AgendamientoService,
    private fb: UntypedFormBuilder,
  ) {
    this.crearformulario();
  }
  ngOnInit(): void {
    this.agendamientoService.cargarOrdenexterna().subscribe(({ ordenes }) => {
      this.ordencalendar = ordenes;
      console.log(this.ordencalendar);
      this.calendarEvents = this.ordencalendar.map((order) => {
        const orderDate = new Date(order.FECHA);
        //  const isDisabled = Number(order.count) === 3;

        return {
          title: order.count,
          start: order.FECHA,
          extendedProps: { value: order.count },
        };
      });
      this.calendarOptions.events = this.calendarEvents;
      // Add a dateClick event handler
    });
    this.escucharSocket();
  }
  renderEventContent(eventInfo: any) {
    const value = eventInfo.event.extendedProps.value;
    if (value === 2) {
      return {
        html: `<div class="bg-event" style="background-color: #FFC733;">${eventInfo.event.title}</div>`,
      };
    }
    if (value == 3) {
      return {
        html: `<div class="bg-event" style="background-color: green;">${eventInfo.event.title}</div>`,
      };
    }
    if (value == 4) {
      return {
        html: `<div class="bg-event" style="background-color: red;">${eventInfo.event.title}</div>`,
      };
    } else {
      return { html: eventInfo.event.title };
    }
  }
  crearformulario() {
    this.AgendarForm = this.fb.group({
      DLCBEN: ['', [Validators.required]],
      DLCACT: ['', [Validators.required]],
      DLCDEP: ['', [Validators.required]],
      DLCOTR: ['', [Validators.required]],
      DLCEDU: ['', [Validators.required]],
      DLCPRO: ['', [Validators.required]],
      DLCSER: ['', [Validators.required]],
      DLCMED: ['', [Validators.required]],
      DLCDIS: ['', [Validators.required]],
      DLNUOR: ['', [Validators.required]],
      DLAPEL: ['', [Validators.required]],
      DLNOMB: ['', [Validators.required]],
      DLSEXO: ['', [Validators.required]],
      DLFECN: ['', [Validators.required]],
      DLHIST: ['', [Validators.required]],
      DLTIDO: ['', [Validators.required]],
      FECHA: ['', [Validators.required, this.dateValidator]],

      DLCEXAS: this.fb.array([]),
    });
  }

  dateValidator(control: UntypedFormControl): ValidationErrors | null {
    const selectedDate: Date = new Date(control.value);
    if (selectedDate.getDate() === 1) {
      return { invalidDate: true };
    }
    return null;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const selectedDate: Date = selectInfo.start;

    // const selectedDate: Date = selectInfo.start;
    const year = selectedDate.getFullYear();
    const month = this.padNumber(selectedDate.getMonth() + 1);
    const day = this.padNumber(selectedDate.getDate());
    this.selectedDateString = `${year}-${month}-${day}`;

    //console.log('Selected date (ISO):', selectedDate.toISOString());
  }

  padNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  buscarAs400(orden: string) {
    this.agendamientoService.ordenAs400(orden).subscribe((data) => {
      //this.dataseleccionada=data;
      console.log(`data`, data);
      if (data.DLCBEN) {
        const {
          DLCBEN,
          DLCACT,
          DLCDEP,
          DLCOTR,
          DLCEDU,
          DLCPRO,
          DLCSER,
          DLCMED,
          DLCDIS,
          DLNUOR,
          DLAPEL,
          DLNOMB,
          DLSEXO,
          DLFECN,
          DLHIST,
          DLTIDO,

          DLCEXAS,
        } = data;

        this.AgendarForm.setValue({
          DLCBEN: DLCBEN,
          DLCACT: DLCACT,
          DLCDEP: DLCDEP,
          DLCOTR: DLCOTR,
          DLCEDU: DLCEDU,
          DLCPRO: DLCPRO,
          DLCSER: DLCSER,
          DLCMED: DLCMED,
          DLCDIS: DLCDIS,
          DLNUOR: DLNUOR,
          DLAPEL: DLAPEL,
          DLNOMB: DLNOMB,
          DLSEXO: DLSEXO,
          DLFECN: DLFECN,
          DLHIST: DLHIST,
          DLTIDO: DLTIDO,
          FECHA: '',
          DLCEXAS: DLCEXAS.map((valor) =>
            this.DLCEXAS.push(
              this.fb.group({
                ItemID: valor['ItemID'],
                ItemName: valor['ItemName'],
              }),
            ),
          ),
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: `${data}`,
        });
      }
    });
  }
  guardarOrden() {
    if (this.AgendarForm.invalid) {
      return Object.values(this.AgendarForm.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    this.agendamientoService.GuardarOrden(this.AgendarForm.value).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
        this.agendamientoService.emit('orden-generada', {
          mensaje: 'Se ha creado una nueva orden',
        });
        this.AgendarForm.reset();
        this.DLCEXAS.clear();
      },
      (err) => {
        console.log(`***error**`, err);
        Swal.fire({
          icon: 'info',

          text: err.error.msg,
        });
      },
    );
  }
  escucharSocket() {
    this.agendamientoService
      .listen('orden-generada')
      .subscribe((ordenesActualizadas: any) => {
        console.log(ordenesActualizadas);
        this.ordencalendar = ordenesActualizadas;

        this.calendarEvents = this.ordencalendar.map((order: any) => ({
          title: order.count, // O cualquier otro campo necesario
          start: order.FECHA,
        }));

        // Actualizar el calendario con las órdenes recientes
        this.fullCalendarRef.nativeElement.fullCalendar('removeEventSources');
        this.fullCalendarRef.nativeElement.fullCalendar(
          'addEventSource',
          this.calendarEvents,
        );
      });
  }
}
