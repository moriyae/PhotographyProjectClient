import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})


export class AdminPageComponent  implements OnInit {

  headerText="";
  user!:Client;
  userId!:number;
  tabs=[false,false,false,false];

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

  diary(){
    this.tabs=[false];
    this.tabs[0]=true;
    this.adminPageService.setCurrentEventNull();
    this.router.navigate(['diary'],{relativeTo:this.route});
  }

  clientsManagment(){
    this.tabs=[false];
    this.tabs[1]=true;
    this.adminPageService.setCurrentEventNull();
    this.router.navigate(['clients-managment'],{relativeTo:this.route});
  }

  eventsManagment(){
    this.tabs=[false];
    this.tabs[2]=true;
    this.adminPageService.setCurrentEventNull();
    this.router.navigate(['events-managment'],{relativeTo:this.route});
  }

  categoriesManagment(){
    this.tabs=[false];
    this.tabs[3]=true;
    this.adminPageService.setCurrentEventNull();
    this.router.navigate(['categories-managment'],{relativeTo:this.route});
  }

  profile(){
    this.tabs=[false];
    this.tabs[4]=true;
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
