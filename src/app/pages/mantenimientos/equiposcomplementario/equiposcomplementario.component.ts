import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipocomplementarioID } from 'src/app/interfaces/cargarByIdEquipocomplementario.interface';
//import { equipocom } from 'src/app/interfaces/cargaequipocom.interface';
import { Equipocomplementario } from 'src/app/interfaces/cargarEquipocomplementarios.interface';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-equiposcomplementario',

  templateUrl: './equiposcomplementario.component.html',
  styleUrl: './equiposcomplementario.component.css',
})
export class EquiposcomplementarioComponent implements OnInit {
  equipoComForm!: FormGroup;
  cargando: false;
  //listaequipocom:equipocom[]=[];
  public page!: number;
  public btnVal = 'Guardar';
  listaequipocom: EquipocomplementarioID;
  listaequipocomplementario: Equipocomplementario[] = [];
  equipocomTemp : Equipocomplementario[] = [];
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get equipo() {
    return (
      this.equipoComForm?.get('equipo')!.invalid &&
      this.equipoComForm?.get('equipo')!.touched
    );
  }

  /*   get CATEGORIA() {
      return (
        this.equipoComForm?.get('CATEGORIA')!.invalid &&
        this.equipoComForm?.get('CATEGORIA')!.touched
      );
    } */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearEquipoComp(id));
    this.getequipocom();
  }

  crearEquipoComp(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.equipoComForm.reset();
      this.equipoComForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.equipoComForm.disable();
    this.manteniemintoService
      .getByIDEquipoComplementario(id)
      .subscribe((EquipocomplementarioID) => {
        console.log(EquipocomplementarioID);
        !EquipocomplementarioID
          ? this.router.navigateByUrl('/dashboard/equipocomplementario/Nuevo')
          : console.log(EquipocomplementarioID);
        const { equipo } = EquipocomplementarioID;

        this.equipoComForm.patchValue({
          equipo,
        });
        this.listaequipocom = EquipocomplementarioID;
      });
  }
  getequipocom() {
    this.manteniemintoService
      .getEquipoComplementario()
      .subscribe((equipocomplementario) => {
        console.log(equipocomplementario);
        this.listaequipocomplementario = equipocomplementario.sort((a,b)=>a.equipo.localeCompare( b.equipo));
      });
  }

  crearFormulario() {
    this.equipoComForm = this.fb.group({
      equipo: ['', [Validators.required]],
    });
  }

  crearEquipoCom() {
    if (this.equipoComForm.invalid) {
      this.equipoComForm.markAllAsTouched();
      return;
    }
    console.log(this.equipoComForm.value);
    if (this.listaequipocom) {
      const data = {
        ...this.equipoComForm.value,
        id: this.listaequipocom.id,
      };

      this.manteniemintoService
        .getUpdateEquipoComplementario(data)
        .subscribe((resp: any) => {
          const { msg } = resp;

          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getequipocom();
          this.equipoComForm.disable();
          this.equipoComForm.reset();
          this.btnVal = 'Editar';
          this.listaequipocom=undefined;
          this.router.navigateByUrl('/dashboard/equipocomplementario/Nuevo');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearEquipoComplementario(this.equipoComForm.value)
        .subscribe(
          (resp: any) => {
            this.getequipocom();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });
            $('#modal-info').modal('hide');
            this.equipoComForm.reset({
              NOMBRE: '',
              CATEGORIA: '',
            });
            this.router.navigateByUrl('/dashboard/equipocomplementario/Nuevo');;
          },
          (err) => {
            console.log('error', err.error.msg);
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: err.error.msg,
            });
          },
        );
    }
  }
  editarEquipocom(equipocom: Equipocomplementario) {}

  borrarequipocom(equipocom: Equipocomplementario) {
    console.log(equipocom);
    Swal.fire({
      title: 'Eliminar equipo?',
      text: `Esta seguro que desea eliminar el complemento  ${equipocom.equipo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEquipoComplementario(equipocom)
          .subscribe((resp: any) => {
            
            this.getequipocom();
            const { msg } = resp;

            Swal.fire({
              title: 'Complemento eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearEquipoCom();
      this.equipoComForm.enable();
      // this.panelform.reset();
    }
    this.equipoComForm.enable();
    this.btnVal = 'Guardar';
  }

  reset(){
    this.router.navigateByUrl("/dashboard/equipocomplementario/Nuevo")
    this.listaequipocom=undefined;
  }


  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaequipocomplementario = this.equipocomTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEquipoCom(termino)
        .subscribe((equipocomplementario) => {
          this.listaequipocomplementario = equipocomplementario;
        });
    }
  }
}
