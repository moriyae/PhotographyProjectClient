import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';
import { DatePipe, Location } from '@angular/common'
import { ClientPageService } from 'src/services/client-page.service';

@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.css']
})
export class ClientEventsComponent {
  
  resultArray!:any;
  searchText!:any;
  allEvents!:any;

  constructor(private adminPageService: AdminPageService, 
              private clientPageService:ClientPageService,
              private logInServic: LoggedInGuardService,
              public matDialog:MatDialog,
              private router: Router,
              private location:Location,
              private route:ActivatedRoute) { 
  }

  async ngOnInit() {
    await this.adminPageService.getAllEvents();
    await this.logInServic.getAllClients();
    this.logInServic.setCurrentClientUndefined();
    await this.getAllEvents();
  }

  closeDialog(){
    this.location.back();
    this.matDialog.closeAll();
  }

  async getAllEvents() {
    console.log(sessionStorage.getItem('clientId'))
    await this.clientPageService.getEvents(sessionStorage.getItem('clientId')).then(a=>{console.log(a);this.allEvents=a})
  }

  onSelectEvent(event: any) {
    console.log(event)
    this.adminPageService.setCurrentEvent(event.eventId);
    console.log(this.adminPageService.eventSelected);
    sessionStorage.setItem('IDEvent', event.Id+'');
    sessionStorage.setItem('eventClientId',event.ClientId+'')
    sessionStorage.setItem('eventName',event.NameEvent+'')
    console.log(sessionStorage)
    this.router.navigate(['/ezorIshi/event'])
  }
}