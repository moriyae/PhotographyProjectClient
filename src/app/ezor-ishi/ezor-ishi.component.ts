import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPageService } from 'src/services/client-page.service';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';

@Component({
  selector: 'app-ezor-ishi',
  templateUrl: './ezor-ishi.component.html',
  styleUrls: ['./ezor-ishi.component.css']
})

export class EzorIshiComponent implements OnInit {
  
  headerText="";
  user!:Client;
  userId!:number;
  tabs=[false,false];

  constructor(private router:Router,
              private route:ActivatedRoute,
              private logInService:LoggedInGuardService,
              private adminPageService:AdminPageService){}

  ngOnInit(){
    this.user=this.logInService.currentClient as Client;
    this.logInService.getAllClients();
    this.userId=this.user.Id;
    this.headerText=" שלום "+this.logInService.currentClient?.FirstName+" "+this.logInService.currentClient?.LastName;
  }

 myEvents(){
    this.tabs=[false];
    this.tabs[0]=true;
    this.adminPageService.setCurrentEventNull();
    sessionStorage.setItem('clientId',this.userId+'');
    this.router.navigate(['my-events'],{relativeTo:this.route});
  }

  profile(){
    this.tabs=[false];
    this.tabs[1]=true;
    console.log(this.user)
    console.log(this.userId)
    this.logInService.setCurrentClient(this.userId);
    this.adminPageService.setCurrentEventNull();
    this.router.navigate(['profile','update'],{relativeTo:this.route});
  }

  exit(){
    this.adminPageService.setCurrentEventNull();
    this.logInService.exit();
  }

}
