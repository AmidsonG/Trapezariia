import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.page.html',
  styleUrls: ['./politica-privacidade.page.scss'],
})
export class PoliticaPrivacidadePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closePolitica(){
    this.router.navigate(['/tabs/tab4']);
  }

}
