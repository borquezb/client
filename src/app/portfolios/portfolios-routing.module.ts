import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { AddEditComponent } from '../portfolios/add-edit.component';
import {LayoutComponent} from '../users/layout.component';
import {PortfolioComponent} from "./portfolio.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent },
      { path: 'show/:id', component: PortfolioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfoliosRoutingModule { }
