import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormDadosComponent } from './form-dados/form-dados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
 declarations: [
    FormDadosComponent,
    // outros componentes declarados aqui
 ],
 imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
 ],
 exports: [
    FormDadosComponent,
    // outros componentes exportados aqui
 ],
 schemas: [
    // Adicione CUSTOM_ELEMENTS_SCHEMA se necessário
    // CUSTOM_ELEMENTS_SCHEMA
 ]
})
export class ComponentsModule { }
