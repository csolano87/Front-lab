import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //{path:'**', component: NofoundpageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
