import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
/* import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSliderModule } from '@angular/material/slider'; */

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    /* MatToolbarModule, MatSliderModule */
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    FooterComponent,
    RouterModule
  ],
})
export class SharedModule {}
