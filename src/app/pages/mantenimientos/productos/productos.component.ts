import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { ImportacionService } from 'src/app/services/importacion.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  exceldata: any;
  search: string = '';
  productoForm!: FormGroup;
  data = [];
  fileTemp;
  control: UntypedFormArray;

  listaproductos: Producto[] = [];
  public desde: number = 0;
  public page!: number;
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1;
  cargando = false;
  selectedFile: File | null = null;



  productos = [
    { REFERENCIA: '130652012M', NOMBRE: 'MAGLUMI DHEA-S (CLIA) 2G/50 tests', CATEGORIA: 1, UNIDAD: '50 tests', GENERACION: '2G', VALOR: 1 },
    { REFERENCIA: '130603001M', NOMBRE: 'MAGLUMI TSH (CLIA) 1G/50 tests', CATEGORIA: 1, UNIDAD: '50 tests', GENERACION: '1G', VALOR: 1 },
    { REFERENCIA: '130616504M', NOMBRE: 'MAGLUMI IL-6 (CLIA) 2G/50 tests', CATEGORIA: 1, UNIDAD: '50 tests', GENERACION: '2G', VALOR: 1 },
    { REFERENCIA: '130201035M', NOMBRE: 'MAGLUMI Free PSA (CLIA) 2G/100 tests', CATEGORIA: 1, UNIDAD: '100 tests', GENERACION: '2G', VALOR: 1 },
    { REFERENCIA: '130252001M', NOMBRE: 'MAGLUMI FSH (CLIA) 2G/100 tests', CATEGORIA: 1, UNIDAD: '100 tests', GENERACION: '2G', VALOR: 1 }
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private inportService: ImportacionService,
  ) {}

  ngOnInit() {
    /*  this.productoForm = this.fb.group({
      tableRows: this.fb.array([]),
    });
    if (this.data.length == 0) this.addRow();
    else this.populateTableWithData(this.data); */

    // this.activatedRoute.params.subscribe(({ id }) => this.crearImport(id));

    this.getProductos();
  }

  /* crearImport(id:string){

  } */

  onFileSelected?(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enviarArchivo() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.inportService
      .getCargaExcelproductos(formData)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
      });
  }
  getProductos() {
    this.cargando = true;
    this.inportService.getProductos().subscribe((productos) => {
      this.listaproductos = productos;
      this.cargando = false;
      console.log(productos);
    });
  }

  borrarProducto(producto: Producto) {
    Swal.fire({
      title: 'Eliminar producto?',
      text: `Esta seguro que desea eliminar el producto # ${producto.REFERENCIA}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inportService
          .getDeleteProducto(producto)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getProductos();
            Swal.fire({
              title: 'Producto eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
    //  console.log(id);
  }

  editarProducto(producto: Producto) {
    console.log(producto);
  }

  onSearchProducto(search: string) {
    this.search = search;
  }



  generarCSV() {
    const url = 'assets/productos.csv'; // Ruta del archivo en 'src/assets'
    
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, 'productos.csv'); // Nombre del archivo al descargar
      })
      .catch(error => console.error('Error al descargar el archivo:', error));
  
  }

}
