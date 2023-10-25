import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../services/http.service';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-modal-detalhes-chef',
  templateUrl: './modal-detalhes-chef.component.html',
  styleUrls: ['./modal-detalhes-chef.component.scss'],
})


export class ModalDetalhesChefComponent implements OnInit {

  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; 
  isModalOpen = false;
  selectedImage: string = '';
  selectedNome: string = '';
  idAvaliado: number =0;
  selectedDepartamento: string = '';
  selectedFuncao: string = '';
  selectedMorada: string = '';
  selectedEmail: string = '';
  estrelasSelecionadas: number = 0;
  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  isModalChefe: boolean = true;
  public chefsAvaliados: any;
  public pratosAvaliados : any;
  public alertButtons = ['OK'];

  setRating(rating: number) {
    this.estrelasSelecionadas = rating;
  }
  constructor(private modalController: ModalController, private httpService: HttpService,private alertController: AlertController) { }

  ngOnInit() {
   
    if(this.isModalChefe){
      this.getChefesAvaliacoes(this.idAvaliado);
    }else{
      this.getPratosAvaliacoes(this.idAvaliado);
    }
   }

  // Método para fechar o modal
  fecharModal() {
    this.modalController.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Avalição',
      subHeader: '',
      message: 'Avalição feita com sucesso!',
      buttons: ['OK'],
    });

    await alert.present();
  } 

  avaliarChefe() {
    const avaliacaoData = {
      "id_do_chefe": this.idAvaliado,
      "numero_de_estrelas": this.estrelasSelecionadas,
      "id_do_usuario": localStorage.getItem('user'),
    };
    this.httpService.enviarAvaliacaoChefe(avaliacaoData).subscribe();
    this.getChefesAvaliacoes(Number(this.idAvaliado));
    this.presentAlert();
  }
  
  avaliarPrato() {
    const avaliacaoData = {
      "id_do_prato": this.idAvaliado,
      "numero_de_estrelas": this.estrelasSelecionadas,
      "id_do_usuario": localStorage.getItem('user'),
    };
    this.httpService.enviarAvaliacaoPrato(avaliacaoData).subscribe();
    this.getPratosAvaliacoes(Number(this.idAvaliado));
    this.presentAlert();
  }

  getPratosAvaliacoes(id: number) {
    this.httpService.getAlimentosAvaliados(id).subscribe((oRet) => {
      this.pratosAvaliados = oRet;
      this.totalAvaliado = this.pratosAvaliados.length;
      this.mediaAvaliado = this.totalAvaliado / 2;
      this.pratosAvaliados.forEach((element: any, key: string) => {
        this.atualizarProgressBar(element.numero_de_estrelas);
      });
    });
  }
  getChefesAvaliacoes(id: number) {
    this.httpService.getChefesAvaliados(id).subscribe((oRet) => {
      this.chefsAvaliados = oRet;
     this.totalAvaliado = this.chefsAvaliados.length;
     this.mediaAvaliado = this.totalAvaliado/2;
     this.chefsAvaliados.forEach((element :any, key:string) => {
      this.atualizarProgressBar(element.numero_de_estrelas);
      });
    });
  }

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }
}


