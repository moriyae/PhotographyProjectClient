import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';
import {Location} from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-clients-managment',
  templateUrl: './clients-managment.component.html',
  styleUrls: ['./clients-managment.component.css']
})
export class ClientsManagmentComponent {
  clients: Client[]=[]
  resultArray!:any;
  searchText!:any;

  constructor(private adminPg: AdminPageService, 
              private logInServic: LoggedInGuardService,
              public matDialog:MatDialog,
              private router: Router,
              private location:Location,
              private route:ActivatedRoute) { 

    
    
    
    
    
    
 }

  ngOnInit() {
    this.getAllClient();
    this.logInServic.setCurrentClientUndefined();
  }

  closeDialog(){
    this.location.back();
    this.matDialog.closeAll();
  }

  getAllEvents(){}
  
  async addClient() {
    this.router.navigate(['client'],{relativeTo:this.route})
  }

  getAllClient() {
    this.logInServic.getAllClients().subscribe(c=>{
      this.clients=c;
      this.logInServic.clients=c;
  })}

  viewClient(client: Client) {
    
    
  }

  onSelectClient(index: number) {
    
    this.logInServic.setCurrentClient(index);
    this.router.navigate(['client','update'],{relativeTo:this.route})
  }

  newClient(){
    this.router.navigate(['client','add'],{relativeTo:this.route});
  }

  refresh(){
    this.ngOnInit();
  }
}
