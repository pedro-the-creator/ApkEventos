import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import { FormularioCadastroComponent } from 'src/app/components/form-dados/form-dados.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CadastrarPage, FormularioCadastroComponent ]
})
export class CadastrarPageModule {}
