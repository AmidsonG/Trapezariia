import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ModalInformacoesHistoricoComponent } from '../modals/modal-informacoes-historico/modal-informacoes-historico.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  //Abrir o Modal da Descrição dos Pratos
  isModalOpen = false;

  selectedImage!: String;
  selectedTitle!: String;
  selectedDescription!: String;
  dataPrato!: String;

  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  public pratosAvaliados: any;
  public dataPratos: any;

  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; // Ajuste conforme necessário

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  async openModal(image: string, title: string, description: string, id: number, dataP: String) {
    const modal = await this.modalController.create({
      component: ModalInformacoesHistoricoComponent,
      componentProps: {
        selectedImage: image,        
        selectedNome: title,
        selectedDepartamento: description,
        idAvaliado: id,
        dataPrato: dataP,
        isModalChefe : false
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

  //Lista de objectos ou JSON que trás os pratos, os nomes e as imagens 19-105


  //Variavel que recebe os pratos
  public pratos: any[] = [];
  params = {} as any;


  constructor(private router: Router, private httpService: HttpService, private modalController: ModalController) {}

  ngOnInit() {
    this.params.page = 0;
    this.getPratos();
  }


  getPratos(event?:any){
    this.params.page +=1;
    this.httpService.getPratos(this.params).subscribe({
      next: (res:any)=>{
        this.pratos.push(...res);
        console.log(this.pratos,'pratos');
      },
    })
  }

  closeHistorico(){
    this.router.navigate(['/tabs/tab1']);
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}




