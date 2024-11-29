import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { cargaProductos } from 'src/app/models/cargaProducto.module';

import { ImportacionService } from 'src/app/services/importacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productoseleccionado: cargaProductos;
  productoForm!: UntypedFormGroup;
  btnVal = 'Guardar';
  tittle='Crear';

  get REFERENCIA() {
    return (
      this.productoForm?.get('REFERENCIA')!.invalid &&
      this.productoForm?.get('REFERENCIA')!.touched
    );
  }


  get NOMBRE() {
    return (
      this.productoForm?.get('NOMBRE')!.invalid &&
      this.productoForm?.get('NOMBRE')!.touched
    );
  }


  get CATEGORIA() {
    return (
      this.productoForm?.get('CATEGORIA')!.invalid &&
      this.productoForm?.get('CATEGORIA')!.touched
    );
  }


  get UNIDAD() {
    return (
      this.productoForm?.get('UNIDAD')!.invalid &&
      this.productoForm?.get('UNIDAD')!.touched
    );
  }


  get GENERACION() {
    return (
      this.productoForm?.get('GENERACION')!.invalid &&
      this.productoForm?.get('GENERACION')!.touched
    );
  }


  get VALOR() {
    return (
      this.productoForm?.get('VALOR')!.invalid &&
      this.productoForm?.get('VALOR')!.touched
    );
  }






  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inportService: ImportacionService,
  ) {
    this.crearProductos();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearProducto(id));
  }
  crearProductos() {
    this.productoForm = this.fb.group({
      REFERENCIA: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      GENERACION: ['', [Validators.required]],
      VALOR: ['', [Validators.required]],
    });
  }
  crearProducto(id: string) {
    if (id === 'Nuevo') {
      this.productoForm.reset();
      this.productoForm.enable();
      this.btnVal = 'Guardar';
      this.tittle='Crear';
      return;
    }
    this.tittle='Actualizar';
    this.btnVal = 'Editar';
    this.productoForm.disable();
    this.inportService.obtenerProductoById(id).subscribe((productos) => {
      !productos
        ? this.router.navigateByUrl('/dashboard/productos')
        : console.log(productos);

      console.log(productos);
      const {
        REFERENCIA,
        NOMBRE,
        CATEGORIA,
        //  id,
        UNIDAD,
        GENERACION,
        VALOR,
      } = productos;
      console.log(REFERENCIA);
      this.productoseleccionado = productos;

      this.productoForm.setValue({
        REFERENCIA,
        NOMBRE,
        CATEGORIA,

        UNIDAD,
        GENERACION,
        VALOR,
      });
    });
  }
  guardar() {
    if (this.productoForm.invalid) {
      return Object.values(this.productoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    if (this.productoseleccionado) {
      const data = {
        ...this.productoForm.value,
        id: this.productoseleccionado.id,
      };
      this.inportService.UpdateProducto(data).subscribe((resp: any) => {
        const { msg } = resp;

        Swal.fire('Actualizado', `${msg}`, 'success');
        
        this.productoForm.disable();
        this.btnVal = 'Editar';
        this.tittle='Actualizar';
      });
      
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.inportService.PostProducto(this.productoForm.value).subscribe((resp: any) => {
        const { msg } = resp;
          
        Swal.fire( `${msg}`, 'success');
        
        this.productoForm.reset();
      },
      (err) => {
        console.log('error', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.msg,
        });
      },
    
    );
    }
  }

  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.guardar();
    }
    this.productoForm.enable();
    this.btnVal = 'Guardar';
    this.tittle='Actualizar'
  }
}
