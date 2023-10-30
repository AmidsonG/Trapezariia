import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public usuarios: any[]=[];
  username: String = '';
  userId = 0;
  
  params = {} as any;
  constructor(
    private httpService:HttpService,
    private router: Router
  ) {
    localStorage.getItem('user');
   }

  ngOnInit() {
    this.username =  String( localStorage.getItem('usernome'))
  }
  


}
