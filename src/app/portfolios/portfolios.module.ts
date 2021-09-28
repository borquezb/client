import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {LayoutComponent} from './layout.component';
import {ListComponent} from '../portfolios/list.component';
import {AddEditComponent} from './add-edit.component';
import {PortfoliosRoutingModule} from './portfolios-routing.module';
import {PortfolioComponent} from "./portfolio.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortfoliosRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    PortfolioComponent
  ]
})
export class PortfoliosModule {
}
