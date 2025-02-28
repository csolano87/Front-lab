import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { StockReserva } from 'src/app/interfaces/cargarStockReserva.interface';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { ImportacionService } from 'src/app/services/importacion.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despachar',

  templateUrl: './despachar.component.html',
  styleUrl: './despachar.component.css',
})
export class DespacharComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private inportService: ImportacionService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
  ) {}
  botonComprobarDeshabilitado = false;
  botonValidarDeshabilitado = true;
  btnVal: string = 'Comprobar Disponiblidad';
  listabodega: Bodega[] = [];
  Area: string = null;
  pedidos: pedidoStock;
  pedidoStockseleccionado: StockReserva;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => this.Pedido(id));
    //  this.getBodega();
    this.getArea();
  }

  getArea() {
    this.getBodega();
  }

  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      const area = this.pedidos.AREA;
      console.log(area);
      this.listabodega = bodega;
      const bodegaX = this.listabodega.find((item) => item.id == area);
      console.log(bodegaX);
      this.Area = bodegaX.NOMBRE;
      console.log(this.Area);
    });
  }

  Pedido(id: string) {
    console.log(id);
    this.inportService.obtenerStockById(id).subscribe((pedidoStock) => {
      console.log(`data BD`, pedidoStock);
      console.log(pedidoStock.AREA);
      const area = this.listabodega.find((item) => item.id == pedidoStock.AREA);
      console.log(this.listabodega);

      this.pedidos = pedidoStock;
    });
  }
  UpdatePedido(pedido) {
    console.log(pedido);
    this.inportService.getvalidarcantidad(pedido).subscribe((resp: any) => {
      const { msg } = resp;
      Swal.fire({
        icon: 'success',
        title: `${msg}`,
        showConfirmButton: false,
      });
      this.router.navigateByUrl('/dashboard/solicitudes-pedidos');
      //this.router.navigateByUrl('/dashboard/solicitudes-pedidos/');
    });
  }
  guardar() {}

  /*   cambioEstado() {
      if (this.btnVal != 'Editar') {
        this.guardar();
      }
      this.importForm.enable();

      this.btnVal = 'Guardar';


    } */

  onreset() {}

  comprobarCantidad(pedido: any) {
    this.botonComprobarDeshabilitado = true;
    this.botonValidarDeshabilitado = false;
    console.log(pedido);
    const validarEntregado = pedido.itemstock.forEach(
      (element) => element.ENTREGADO,
    );

    console.log(validarEntregado);

    const itemstockString = JSON.stringify(pedido);
    const encodedItemstock = encodeURIComponent(itemstockString);
    this.inportService
      .obtenerReservaTotal(encodedItemstock)
      .subscribe((resp) => {
        /*    this.isChecking = false; */
        this.pedidoStockseleccionado = resp;
        /*    console.log(resp);
           this.btnValC = '2'; */
        /*     const productosFormArray = this.importForm.get(
              'PRODUCTOS',
            ) as FormArray; */

        this.pedidoStockseleccionado.cantidadReservada.detalle.forEach(
          (item) => {
            console.log(item);
            const indices = this.pedidos.itemstock
              .map((control, index) =>
                control.ID_PRODUCTO === Number(item.productId) ? index : -1,
              )
              .filter((index) => index !== -1); // Filtrar para obtener solo los índices válidos
            console.log(indices);
            if (indices.length > 0) {
              // Si se encuentra al menos un índice
              indices.forEach((index2) => {
                /*  const control = productosFormArray.at(index2);
                 */ const control = this.pedidos.itemstock[index2];
                // Obtener los valores actuales en el control y concatenarlos con los nuevos valores

                const cantidadActual = control.ENTREGADO || '';
                const loteActual = control.LOTE || '';

                // Concatenar los nuevos valores
                control.ENTREGADO = cantidadActual
                  ? `${cantidadActual}, ${item.cantidadReservada}`
                  : `${item.cantidadReservada || '0'}`;

                control.LOTE = loteActual
                  ? `${loteActual}, ${item.lote || '0'}`
                  : `${item.lote || '0'}`;
                /*    const cantidadActual = control.ENTREGADO;
                   const loteActual = control.LOTE;
                   console.log(cantidadActual);

                   const nuevaCantidad = cantidadActual
                     ? `${cantidadActual}, ${item.cantidadReservada}`
                     : `${item.cantidadReservada || '0'}`;
                   const nuevoLote = loteActual
                     ? `${loteActual}, ${item.lote || '0'}`
                     : `${item.lote || '0'}`; */

                // Asignar los valores concatenados al control
                /* control.get('ENTREGADO').patchValue(nuevaCantidad);
                control.get('LOTE').patchValue(nuevoLote); */
              });
            } else {
            }
          },
        );
      });
    /*    } else {
         console.log(pedido.id);
         console.log(`t`, this.importForm.value);
         const data = {
           id: pedido.id,
           ...this.importForm.value,
         };
         this.inportService.getvalidarcantidad(data).subscribe((resp: any) => {
           const { msg } = resp;
           Swal.fire({
             icon: 'success',
             title: `${msg}`,
             showConfirmButton: false,
           });
           this.router.navigateByUrl('/dashboard/solicitud-pedidos');
           //this.router.navigateByUrl('/dashboard/solicitudes-pedidos/');
         });
       } */
  }
}
