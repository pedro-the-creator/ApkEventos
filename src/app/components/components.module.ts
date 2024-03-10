import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingEventsComponent } from './loading-events/loading-events.component';

@NgModule({
 declarations: [LoadingEventsComponent],
 imports: [
    CommonModule,
    IonicModule,
 ],
 exports: [LoadingEventsComponent]
})
export class ComponentsModule { }
