import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styleUrls: ['./impresora.component.css']
})
export class ImpresoraComponent implements OnInit {
impresoraForm!: UntypedFormGroup;
  constructor( 
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario();}
    get NOMBRE() {
      return (
        this.impresoraForm?.get('NOMBRE')!.invalid &&
        this.impresoraForm?.get('NOMBRE')!.touched
      );
    }
 
  ngOnInit(): void {
  }
  crearFormulario() {
    this.impresoraForm = this.fb.group(
      {
       
        NOMBRE: ['', [Validators.required]],
       
      },
      
    );
  }


  crearImpresora() {

    if (this.impresoraForm.invalid) {
      this.impresoraForm.markAllAsTouched();
      return;
    }
    console.log(this.impresoraForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearImpresora(this.impresoraForm.value).subscribe(
      (resp:any) => {

        const {msg}=resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer:1500
        });
        this.impresoraForm.reset({
         
          NOMBRE: '',
          CATEGORIA: '',
          
        });
        //this.router.navigateByUrl('/dashboard/usuarios');
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
