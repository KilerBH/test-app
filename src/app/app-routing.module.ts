import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'table' },
  { path: 'table', component: TableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }