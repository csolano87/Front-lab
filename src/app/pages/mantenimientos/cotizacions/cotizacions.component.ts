import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cotizacion } from 'src/app/interfaces/cargacotizacion.interface';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-cotizacions',
  
  templateUrl: './cotizacions.component.html',
  styleUrl: './cotizacions.component.css'
})
export class CotizacionsComponent implements OnInit {
cargando=false;
listacotizacion:Cotizacion[]=[];
page


constructor(
  private router: Router,
  private cotizacionService: CotizacionService,

){

}

ngOnInit(): void {
  this.cotizacionService.getCotizacion().subscribe((cotizacion)=>{

   this.listacotizacion= cotizacion
  })
}

getCotizacion(){

}


  buscar(termino:string){

  }
  pdf2(){

  }
}
