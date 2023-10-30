import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-modal-informacoes-historico',
  templateUrl: './modal-informacoes-historico.component.html',
  styleUrls: ['./modal-informacoes-historico.component.scss'],
})
export class ModalInformacoesHistoricoComponent  implements OnInit {
  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; 
  estrelasSelecionadas: number = 0;
  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  public pratosAvaliados: any;
  selectedDepartamento: string = '';
  selectedNome: string = '';
  selectedImage: string = '';
  idAvaliado: number =0;
  dataPrato: String = '';

  constructor(private modalController: ModalController,private httpService: HttpService) { }

  ngOnInit() {
    this.getPratosAvaliacoes(this.idAvaliado);
  }

  fecharModal() {
    this.modalController.dismiss();
  }
  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  getPratosAvaliacoes(id: number) {
    this.httpService.getAlimentosAvaliados(id).subscribe((oRet) => {
     this.pratosAvaliados = oRet;
     this.totalAvaliado = this.pratosAvaliados.length;
     this.mediaAvaliado = this.totalAvaliado/2;
     this.pratosAvaliados.forEach((element :any, key:string) => {
      this.atualizarProgressBar(element.numero_de_estrelas);
      });
    });
  }

}
