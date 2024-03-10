import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { ShowEventComponent } from 'src/app/components/show-events/show-events.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,SearchBarComponent,ShowEventComponent]
})
export class HomePageModule {}