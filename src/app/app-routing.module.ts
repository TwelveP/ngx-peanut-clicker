import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeanutsComponent } from './peanuts/peanuts.component';

const routes: Routes = [
  {
    path: 'peanuts', component: PeanutsComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/peanuts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
