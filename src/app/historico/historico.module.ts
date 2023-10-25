import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoPageRoutingModule } from './historico-routing.module';

import { HistoricoPage } from './historico.page';

import { ModalInformacoesHistoricoComponent } from '../modals/modal-informacoes-historico/modal-informacoes-historico.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoPageRoutingModule
  ],
  declarations: [HistoricoPage, ModalInformacoesHistoricoComponent]
})
export class HistoricoPageModule {}
