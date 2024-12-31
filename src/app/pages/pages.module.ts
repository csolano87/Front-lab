import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { OrdenComponent } from './mantenimientos/orden/orden.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesComponent } from './mantenimientos/ordenes/ordenes.component';
import { UsuarioComponent } from './mantenimientos/usuario/usuario.component';
import { PerfilComponent } from './mantenimientos/perfil/perfil.component';
import { MuestrasComponent } from './mantenimientos/muestras/muestras.component';

import { ProductoComponent } from './mantenimientos/producto/producto.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ComponentsModule } from '../components/components.module';
import { MuestraComponent } from './mantenimientos/muestra/muestra.component';
import { MuestrasRechazoComponent } from './mantenimientos/muestras-rechazo/muestras-rechazo.component';
import { BuscarHisComponent } from './mantenimientos/buscar-his/buscar-his.component';
import { UppercaseDirective } from './uppercase.directive';
import { MuestraUpdateComponent } from './mantenimientos/muestra-update/muestra-update.component';
import { ResgistroPacientesComponent } from './mantenimientos/resgistro-pacientes/resgistro-pacientes.component';
import { ReportProduccionComponent } from './mantenimientos/report-produccion/report-produccion.component';
import { ReportQCComponent } from './mantenimientos/report-qc/report-qc.component';
import { AgendamientoComponent } from './mantenimientos/agendamiento/agendamiento.component';
import { ConsultaWebComponent } from './mantenimientos/consulta-web/consulta-web.component';

import { FullCalendarModule } from '@fullcalendar/angular';

import { environment } from 'src/environments/environment.prod';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AgendadosComponent } from './mantenimientos/agendados/agendados.component';
import { AgendamientoManualComponent } from './mantenimientos/agendamiento-manual/agendamiento-manual.component';
import { OrdenManualComponent } from './mantenimientos/orden-manual/orden-manual.component';
import { EstadisticaMicroComponent } from './mantenimientos/estadistica-micro/estadistica-micro.component';
import { ComprasComponent } from './mantenimientos/compras/compras.component';
import { ConsultaComprasComponent } from './mantenimientos/consulta-compras/consulta-compras.component';
import { ImportacionComponent } from './mantenimientos/importacion/importacion.component';
import { ListaproductosComponent } from './mantenimientos/listaproductos/listaproductos.component';
import { ImportadosComponent } from './mantenimientos/importados/importados.component';
import { TotalPedidosComponent } from './mantenimientos/total-pedidos/total-pedidos.component';
import { ImpresoraComponent } from './mantenimientos/impresora/impresora.component';
import { EquiposComponent } from './mantenimientos/equipos/equipos.component';
import { ClienteComponent } from './mantenimientos/cliente/cliente.component';
import { MarcaComponent } from './mantenimientos/marca/marca.component';

import { PanelPruebasComponent } from './mantenimientos/panel-pruebas/panel-pruebas.component';
import { StockComponent } from './mantenimientos/stock/stock.component';
import { DisabledIfDirective } from '../directiva/disabled-if.directive';
import { StocksComponent } from './mantenimientos/stocks/stocks.component';
import { UtcDatePipe } from '../pipes/utc-date.pipe';
import { PedidosComponent } from './mantenimientos/pedidos/pedidos.component';
import { SolicitudesPedidosComponent } from './mantenimientos/solicitudes-pedidos/solicitudes-pedidos.component';
//import { ManualAs400Component } from './mantenimientos/manual-as400/manual-as400.component';
import { CargaOrdenesComponent } from './mantenimientos/carga-ordenes/carga-ordenes.component';
import { StockPruebasComponent } from './mantenimientos/stock-pruebas/stock-pruebas.component';
import { ManualAs400Component } from './mantenimientos/manual-as400/manual-as400.component';
import { ManualComponent } from './mantenimientos/manual/manual.component';
import { ReactivosComponent } from './mantenimientos/reactivos/reactivos.component';
import { CategoriaComponent } from './mantenimientos/categoria/categoria.component';
import { EstadoComponent } from './mantenimientos/estado/estado.component';
import { UbicacionComponent } from './mantenimientos/ubicacion/ubicacion.component';
import { EquipoComponent } from './mantenimientos/equipo/equipo.component';
import { ReactivoComponent } from './mantenimientos/reactivo/reactivo.component';
import { ModalidadComponent } from './mantenimientos/modalidad/modalidad.component';
import { ParticipacionComponent } from './mantenimientos/participacion/participacion.component';
import { CotizacionComponent } from './mantenimientos/cotizacion/cotizacion.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { CorreosComponent } from './mantenimientos/correos/correos.component';
import { StockManualComponent } from './mantenimientos/stock-manual/stock-manual.component';
import { StockmanoComponent } from './mantenimientos/stockmano/stockmano.component';
import { QRCODEComponent } from './mantenimientos/qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AnalizadorComponent } from './mantenimientos/analizador/analizador.component';
import { AnalizadorsComponent } from './mantenimientos/analizadors/analizadors.component';
import { CotizacionsComponent } from './mantenimientos/cotizacions/cotizacions.component';
import { TipomuestrasComponent } from './mantenimientos/tipomuestras/tipomuestras.component';
import { TubosComponent } from './mantenimientos/tubos/tubos.component';
import { RangoreferenciaComponent } from './mantenimientos/rangoreferencia/rangoreferencia.component';
import { IngresordenesComponent } from './mantenimientos/ingresordenes/ingresordenes.component';
import { PanelPerfilesComponent } from './mantenimientos/panel-perfiles/panel-perfiles.component';
import { GruposexamenesComponent } from './mantenimientos/gruposexamenes/gruposexamenes.component';
import { TiposervicioComponent } from './mantenimientos/tiposervicio/tiposervicio.component';
import { TipoatencionComponent } from './mantenimientos/tipoatencion/tipoatencion.component';
import { TipogrupoComponent } from './mantenimientos/tipogrupo/tipogrupo.component';
import { DiagnosticoComponent } from './mantenimientos/diagnostico/diagnostico.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EquiposcomplementarioComponent } from './mantenimientos/equiposcomplementario/equiposcomplementario.component';
import { EstadofinancieroclienteComponent } from './mantenimientos/estadofinancierocliente/estadofinancierocliente.component';
import { EstadofinancieroproveedorComponent } from './mantenimientos/estadofinancieroproveedor/estadofinancieroproveedor.component';
import { BodegaComponent } from './mantenimientos/bodega/bodega.component';
import { ResultadosComponent } from './mantenimientos/resultados/resultados.component';
import { ReportesResultadosComponent } from './mantenimientos/reportes-resultados/reportes-resultados.component';
import { TransferenciaComponent } from './mantenimientos/transferencia/transferencia.component';
import { StockbodegasComponent } from './mantenimientos/stockbodegas/stockbodegas.component';
import { DescargarbodegaComponent } from './mantenimientos/descargarbodega/descargarbodega.component';
import { TipofisiologicoComponent } from './mantenimientos/tipofisiologico/tipofisiologico.component';
import { UnidadComponent } from './mantenimientos/unidad/unidad.component';
import { UnidadedadComponent } from './mantenimientos/unidadedad/unidadedad.component';
import { ValidacionresultadosComponent } from './mantenimientos/validacionresultados/validacionresultados.component';
import { TecnicaComponent } from './mantenimientos/tecnica/tecnica.component';
import { MuestraspruebasComponent } from './mantenimientos/muestraspruebas/muestraspruebas.component';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { FiltroexamPipe } from '../pipes/filtroexam.pipe';
import { FiltroProductoPipe } from '../pipes/filtro-producto.pipe';
import { FiltroStockPipe } from '../pipes/filtro-stock.pipe';
import { MenuComponent } from './mantenimientos/menu/menu.component';
import { ListadoStockComponent } from './mantenimientos/listado-stock/listado-stock.component';
import { CargaInternaComponent } from './mantenimientos/carga-interna/carga-interna.component';
const config: SocketIoConfig = { url: environment.url, options: {} };

@NgModule({
  declarations: [

    ListadoStockComponent,
    CargaInternaComponent,
    MenuComponent,
    FiltroexamPipe,
    FiltroStockPipe,
    FiltroProductoPipe,
    GroupByPipe,
    TecnicaComponent,
    MuestraspruebasComponent,
    UnidadComponent,
    UnidadedadComponent,
    StockbodegasComponent,
    TipofisiologicoComponent,
    ValidacionresultadosComponent,
    DescargarbodegaComponent,
    TransferenciaComponent,
    ReportesResultadosComponent,
    EstadofinancieroclienteComponent,
    BodegaComponent,
    ResultadosComponent,
    EstadofinancieroproveedorComponent,
    EquiposcomplementarioComponent,
    TiposervicioComponent,
    TipoatencionComponent,
    TipogrupoComponent,
    DiagnosticoComponent,

    PanelPerfilesComponent,
    GruposexamenesComponent,
    IngresordenesComponent,
    RangoreferenciaComponent,
    TipomuestrasComponent,
    TubosComponent,
    CotizacionsComponent,
    AnalizadorsComponent,
    AnalizadorComponent,
    StockmanoComponent,
    QRCODEComponent,
    StockManualComponent,
    CotizacionComponent,
    CorreosComponent,
    ParticipacionComponent,
    ModalidadComponent,
    ReactivoComponent,
    EquipoComponent,
    EstadoComponent,
    UbicacionComponent,
    CategoriaComponent,
    ReactivosComponent,
    StockPruebasComponent,
    CargaOrdenesComponent,

    ManualComponent,
    DashboardComponent,
    PagesComponent,
    OrdenComponent,
    OrdenManualComponent,
    OrdenesComponent,
    UsuarioComponent,
    UsuariosComponent,
    PerfilComponent,
    MuestrasComponent,

    ProductosComponent,
    ProductoComponent,
    MuestraComponent,
    MuestrasRechazoComponent,
    BuscarHisComponent,
    UppercaseDirective,
    MuestraUpdateComponent,
    ResgistroPacientesComponent,
    ReportProduccionComponent,
    ReportQCComponent,
    AgendamientoComponent,
    ConsultaWebComponent,
    AgendadosComponent,
    AgendamientoManualComponent,
    EstadisticaMicroComponent,
    ComprasComponent,
    ConsultaComprasComponent,
    ImportacionComponent,
    ListaproductosComponent,
    ImportadosComponent,
    TotalPedidosComponent,
    ImpresoraComponent,
    EquiposComponent,
    ClienteComponent,
    MarcaComponent,
    PanelPruebasComponent,
    StockComponent,
    StocksComponent,
    PedidosComponent,
    SolicitudesPedidosComponent,

    //FilterPipe,
  ],

  exports: [
    DashboardComponent,
    PagesComponent,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DisabledIfDirective,
    FullCalendarModule,
  ],
  imports: [
    FormsModule,
    ComponentsModule,
    DisabledIfDirective,
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    BarcodeScannerLivestreamModule,
    QRCodeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FullCalendarModule,
    UtcDatePipe,
    NgxChartsModule,
    SocketIoModule.forRoot(config),
  ],
})
export class PagesModule {}
