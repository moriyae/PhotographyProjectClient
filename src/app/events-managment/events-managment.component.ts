import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { el } from 'date-fns/locale';
import { DatePipe, Location } from '@angular/common'
import localeEs from '@angular/common/locales/he';
import { ClientPageService } from 'src/services/client-page.service';
import { Client } from '../add-new-client/add-new-client.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events-managment',
  templateUrl: './events-managment.component.html',
  styleUrls: ['./events-managment.component.css'],
})
export class EventsManagmentComponent {
  clients: Client[]=[]
  resultArray!:any;
  searchText!:any;
  allEvents=[];

  constructor(private adminPageService: AdminPageService, 
              private logInServic: LoggedInGuardService,
              public matDialog:MatDialog,
              private router: Router,
              private location:Location,
              private snackBar:MatSnackBar,
              private route:ActivatedRoute) { 
  }

  async ngOnInit() {
    this.logInServic.setCurrentClientUndefined();
    await this.getAllEvents();
    this.adminPageService.getAllEvents();
    this.logInServic.getAllClients();
  }

  closeDialog(){
    this.location.back();
    this.matDialog.closeAll();
  }

  closeDeleteDialog(){
    this.matDialog.closeAll();
  }

 
  async addClient() {
    this.router.navigate(['client'],{relativeTo:this.route})
  }

  async getAllEvents() {
    await this.adminPageService.getAllEventsWithDetails().then((e:any) => { this.allEvents=e})
  }

  onSelectEvent(event: any) {
    console.log(event)
    this.adminPageService.setCurrentEvent(event.eventId);
    console.log(this.adminPageService.eventSelected);
    sessionStorage.setItem('IDEvent', event.eventId+'');
    sessionStorage.setItem('eventClientId',event.ClientId+'')
    sessionStorage.setItem('eventName',event.NameEvent+'')
    console.log(sessionStorage)
    this.router.navigate(['/admin-page/event'])
  }

  onSelectEventToDelete(eventId:any){
    sessionStorage.setItem('IDEvent', eventId);
  }


  deleteEvent(){
    let id=sessionStorage.getItem('IDEvent');
    this.adminPageService.deleteEvent(id).subscribe(a=>{
      if(a){
        this.matDialog.closeAll();
        this.snackBar.open('!האירוע נמחק בהצלחה','X')
        this.refresh();
      }
    })

  }


  onSelectClient(clientId:number){
    this.logInServic.setCurrentClient(clientId);
    this.router.navigate(['client','update'],{relativeTo:this.route})
  }

  newEvent(){
    this.router.navigate(['add-event'],{relativeTo:this.route});
  }

  refresh(){
    this.ngOnInit()
  }
}