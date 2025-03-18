import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { StockReserva } from 'src/app/interfaces/cargarStockReserva.interface';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { Usuario } from 'src/app/models/usuario.module';
import { ImportacionService } from 'src/app/services/importacion.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
import { subscribe } from 'diagnostics_channel';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private usuarioService: UsuarioService,
  ) {}
  botonComprobarDeshabilitado = false;

  usuarioId: string | '';
  botonValidarDeshabilitado = true;
  public usuarios: Usuario[] = [];
  btnVal: string = 'Comprobar Disponiblidad';
  listabodega: Bodega[] = [];
  Area: string = null;
  pedidos: pedidoStock;
  pedidoStockseleccionado: StockReserva;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => this.Pedido(id));
    this.getUsuarios();
    this.getArea();
  }

  getArea() {
    this.getBodega();
  }
  getUsuarios() {
    this.usuarioService.GetUsuarios().subscribe(({ usuarios }) => {
      this.usuarios = usuarios.filter((item) => item.roleId !== 1);
      console.log(usuarios);
    });
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
      const area = this.listabodega.find((item) => item.id == pedidoStock.AREA);
      console.log(this.listabodega);

      this.pedidos = pedidoStock;
    });
  }
  onUsuario(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.usuarioId = selectElement.value;
    console.log(this.usuarioId);
  }

  UpdatePedido(pedido: any) {
    console.log(this.usuarioId);
    console.log(`pedido`, pedido);
    if (this.usuarioId) {
      const data2 = {
        usuarioId: this.usuarioId,
        ...pedido,
      };

      this.inportService.getvalidarcantidad(data2).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
        this.router.navigateByUrl('/dashboard/solicitudes-pedidos');
      });
    }
  }

  onreset() {

    this.router.navigateByUrl('/dashboard/solicitudes-pedidos');
  }

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
        this.pedidoStockseleccionado = resp;

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
              });
            } else {
            }
          },
        );
      });
  }
}
