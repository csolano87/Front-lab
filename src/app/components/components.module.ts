import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ModalPruebasComponent } from './modal-pruebas/modal-pruebas.component';

@NgModule({
  declarations: [ModalComponent,ModalPruebasComponent],
  exports: [ModalComponent,ModalPruebasComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsModule {}
