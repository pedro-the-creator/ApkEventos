import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharPageRoutingModule } from './detalhar-routing.module';

import { DetalharPage } from './detalhar.page';
import { FormDadosComponent } from 'src/app/components/form-dados/form-dados.component';
import { AppModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
    
  ],
  declarations: [DetalharPage, ]
})
export class DetalharPageModule {}
