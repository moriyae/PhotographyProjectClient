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

export class MyCalendarEvents implements CalendarEvent
{
  Id!:number;
  title!: string;
  start!: Date;  
  end?:Date;
  clientId!:number
  details!:string
  category!:string
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent {
  locale: string = "he";
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  eventShow=false;
  allevents!:any
  show=false
  events:MyCalendarEvents[]=[]

  constructor(private adminPageService:AdminPageService,
              private router:Router,
              private route:ActivatedRoute,
              public matDialog:MatDialog,
              private location:Location){
    this.getEvents()
  }


  async getEvents() {
    
    
    await this.adminPageService.getAllEvents().then(e => { this.allevents=e})
    var calendarEvents=new MyCalendarEvents;
    setTimeout(() => {
      this.allevents.forEach((c: any) => {
           calendarEvents=new MyCalendarEvents();
           calendarEvents.Id=c.Id;
           calendarEvents.category=c.Category;
           calendarEvents.title=c.NameEvent;
           calendarEvents.start=new Date(c.Date);
           calendarEvents.clientId=c.ClientId;
           calendarEvents.details=c.details;
           this.events.push(calendarEvents);
    }) }, 1000);  
    setTimeout(() => {
      this.show=true
    }, 2000); 
  }

  openEvent(event:MyCalendarEvents)
  {
    console.log(event)
    this.eventShow=true;
    sessionStorage.clear();
    
     
      
   
    sessionStorage.setItem('IDEvent', event.Id+'');
    sessionStorage.setItem('eventClientId',event.clientId+'')
    sessionStorage.setItem('eventName',event.title+'')

    this.router.navigate(['admin-page/event']);
  }

  back(){
    this.eventShow=false;
    this.location.back();
  }

  
  
  
  
  
  
  
  
  
}
