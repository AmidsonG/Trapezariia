import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ModalController } from '@ionic/angular';
import { ModalDetalhesChefComponent } from '../modals/modal-detalhes-chef/modal-detalhes-chef.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  selectedImage: string = '';
  selectedNome: string = '';
  idChefe: number | undefined;
  selectedDepartamento: string = '';
  selectedFuncao: string = '';
  selectedMorada: string = '';
  selectedEmail: string = '';
  show : boolean = false;
  public chefsAvaliados: any;
  chef: any[] = [];
  params = {} as any;
  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; // Ajuste conforme necessário

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  async openModal(image: string, nome: string, id: number, departamento: string, funcao: string, morada: string, email: string) {
    
    // Abra o modal
    const modal = await this.modalController.create({
      component: ModalDetalhesChefComponent,
      componentProps: {
        // Passe os parâmetros para o modal aqui
        selectedImage: image,
        selectedNome: nome,
        idAvaliado: id,
        selectedDepartamento: departamento,
        selectedFuncao: funcao,
        selectedMorada: morada,
        selectedEmail: email
      }
    });
  
     await modal.present();
    const { data } = await modal.onDidDismiss();

  }

  constructor( private httpService: HttpService,private modalController: ModalController) { }

  ngOnInit() {
    this.params.page = 0;
    this.getChefe();
  }

  getChefe(_?: any) {
    this.params.page += 1;
    this.httpService.getChefe(this.params).subscribe({
      next: (res: any) => {
        this.chef.push(...res);
        console.log(this.chef, 'funcionario');
      },
      error: (_: any) => {

      }
    })
  }
}



