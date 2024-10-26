import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { ModalDetalhesChefComponent } from '../modals/modal-detalhes-chef/modal-detalhes-chef.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  selectedImage: string = '';
  selectedTitle: string = '';
  selectedDescription: string = '';
  estrelasSelecionadas: number = 0;
  idAvaliado: number = 0;
  mediaAvaliado: number = 0.0;
  totalAvaliado: number = 0;
  public alertButtons = ['OK'];
  public pratos: any[] = [];
  public pratosHoje: any[] = [];
  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10;
  isModalOpen = false;
  params = {} as any;
  public dataPratos: any; 

  async openModal(image: string, title: string, description: string, id: number, dataP: String) {
    const modal = await this.modalController.create({
      component: ModalDetalhesChefComponent,
      
      componentProps: {
        selectedImage: image,        
        selectedNome: title,
        selectedDepartamento: description,
        idAvaliado: id,
        dataPrato: dataP,
        isModalChefe : false
      },
      cssClass: 'custom-modal'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

  

  constructor(private router: Router,
    private httpService: HttpService,
    private datePipe: DatePipe,
    private modalController: ModalController
  ) {}

  setRating(rating: number) {
    this.estrelasSelecionadas = rating;
  }

  ngOnInit() {
    this.params.page = 0;
    this.getPratosDoDia();
  }


  getPratosDoDia() {
    const dataHoje = new Date().toISOString().substring(0, 10); // Obtém a data de hoje no formato "YYYY-MM-DD"
    console.log(`Data de hoje: ${dataHoje}`);
    this.httpService.getPratosDoDia(dataHoje).subscribe({
      next: (res: any) => {
        this.pratosHoje.push(...res);
        console.log(this.pratosHoje, 'pratos');

      },
    })
  }

  todosPratos() {
    this.router.navigate(['historico']);
  }

  








}



