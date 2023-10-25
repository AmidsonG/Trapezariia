import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common'; 
import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ModalDetalhesChefComponent } from '../modals/modal-detalhes-chef/modal-detalhes-chef.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [
    DatePipe, 
  ],
})
export class Tab1PageModule {}
