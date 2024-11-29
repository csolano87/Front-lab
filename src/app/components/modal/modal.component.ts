import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(
    public modalImagenService: ModalImagenService,
    private usuarioServices: UsuarioService,
    private fb: UntypedFormBuilder,
    private doctorservice: LlenarCombosService,
    private router: Router,
  ) {}

  public isLoading = false;
  public src: string;
  public data$: any;
  data = [];
  data1 = [];
  data2 = [];
  data3 = [];
  data4 = [];
  data5 = [];
  data6 = [];
  data7 = [];
  data8 = [];
  data9 = [];
  selectedItemsList = [];
  checkedIDs = [];
  OrdenForm!: UntypedFormGroup;
  quimica = [
    { ItemID: '102', ItemName: 'Perfil Clinico', isChecked: false },
    { ItemName: 'Bilirubinas', ItemID: '103', isChecked: false },
    { ItemName: 'Electrolitos', ItemID: '104', isChecked: false },
    { ItemName: 'Perfil Lipidico', ItemID: '105', isChecked: false },
  ];

  hema = [{ ItemName: 'Bio. Hematica', isChecked: false, ItemID: '106' }];
  coa = [{ ItemName: 'tp/TTp', ItemID: '107', isChecked: false }];
  sero = [{ ItemName: 'AGLU Fresiles', ItemID: '108', isChecked: false }];
  uro = [
    { ItemName: 'EMO', ItemID: '109', isChecked: false },
    { ItemName: 'drogas de AB', ItemID: '110', isChecked: false },
    { ItemName: 'Emo + gram Gf', ItemID: '111', isChecked: false },
  ];
  gas = [
    { ItemName: 'gaso Arterial', ItemID: '112', isChecked: false },
    { ItemName: 'Gaso venosa', ItemID: '113', isChecked: false },
  ];
  perfil = [
    { ItemName: 'Investigacion', ItemID: '114', isChecked: false },
    { ItemName: 'Perfil pre Q', ItemID: '115', isChecked: false },
    { ItemName: 'perfil prenatal', ItemID: '116', isChecked: false },
    { ItemName: 'Perfil cardiaco', ItemID: '117', isChecked: false },
    { ItemName: 'Perfil 1 rel', ItemID: '118', isChecked: false },
  ];
  molecular = [{ ItemName: 'Prueba rapida', ItemID: '119', isChecked: false }];
  copro = [
    { ItemName: 'coprologico', ItemID: '120', isChecked: false },
    { ItemName: 'PNM +SO', ItemID: '121', isChecked: false },
    { ItemName: 'Copro Dia 1', ItemID: '122', isChecked: false },
    { ItemName: 'Copro Dia 2', ItemID: '123', isChecked: false },
    { ItemName: 'Copro Dia 3', ItemID: '124', isChecked: false },
  ];

  //  public mostrarModal:boolean=false
  ngOnInit(): void {}

  cerrarModal() {
    console.log(this.modalImagenService);

    // this.mostrarModal=true;
    this.modalImagenService.cerrarModal();
  }

  /*  seleccionarCategoria(nombre: any) {
    console.log('nombre',nombre.value)
    const laar = this.OrdenForm.get('pruebas') as FormArray;
   
    this.listanombre.push(nombre['ItemName'])
   this.pruebas.push(this.fb.group({
    ItemID:nombre['ItemID']
   }))

  } */

  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.doctorservice.searchTrack({ q: value }).pipe(
      map(({ prueba }) => prueba),

      finalize(() => (this.isLoading = false)),
    );
  }

  /* 
  onchange(e: any) {
    this.data = this.quimica.filter((value, index) => {
      return value.isChecked


    })


    this.data1 = this.hema.filter((value, index) => {
      return value.isChecked
    })

    this.data2 = this.sero.filter((value, index) => {
      return value.isChecked
    })

    this.data3 = this.coa.filter((value, index) => {
      return value.isChecked
    })

    this.data4 = this.coa.filter((value, index) => {
      return value.isChecked
    })

    this.data5 = this.uro.filter((value, index) => {
      return value.isChecked
    })

    this.data6 = this.gas.filter((value, index) => {
      return value.isChecked
    })

    this.data7 = this.perfil.filter((value, index) => {
      return value.isChecked
    })

    this.data8 = this.molecular.filter((value, index) => {
      return value.isChecked
    })
    this.data9 = this.copro.filter((value, index) => {
      return value.isChecked
    })
    
    const checkedValue = e.target.value;


  
    const checked = e.target.checked;

    const laar = this.OrdenForm.get('pruebas') as FormArray;
  
    if (checked) {

      this.pruebas.push(this.fb.group({
        
        ItemID: checkedValue,
      Estado:true}))
      console.log(checked)
    } else {
      let i = 0;
      this.pruebas.removeAt(i);


   
    } */
}

/* 
  removeItem(i:number)
{
  this.pruebas.removeAt(i);
}
 */
