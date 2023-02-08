import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})

export class AddNewEventComponent implements OnInit {
  formGroup!: FormGroup;
  clientsControl=new FormControl('');
  clients!:Client[];
  filteredClients!: Observable<Client[]>;
  client!: Client
  eventSelected!:any|undefined;
  selectedCategoryValue!:string;
  selectedClientId!:number;
  show=true;

  categories=['צילומי אירועים','צילומי מזון','צילומי חוץ','צילומי עיצוב פנים','צילומי סטודיו','צילומי מוצרים'];
    
  constructor(private logInService:LoggedInGuardService,
              private adminPg: AdminPageService, 
              private logIn: LoggedInGuardService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.client = this.logIn.client;
    this.eventSelected= this.adminPg.eventSelected;
    this.logInService.getAllClients().subscribe(c=>{
      this.clients=c;
      this.logInService.clients=c;
    })

    this.createForm();
    setTimeout(() => {
      this.filteredClients = this.clientsControl.valueChanges.pipe(startWith(''),
      map(value => this.clients.filter(option => (option.FirstName+''+option.LastName).includes(value+''))));  
    }, 1000);
 }


  createForm(){
    console.log(this.eventSelected)
    this.formGroup = this.formBuilder.group({
      NameEvent: [this.eventSelected!=undefined? this.eventSelected.NameEvent : '', Validators.required],
      Date: [this.eventSelected!=undefined? this.eventSelected.Date : '', Validators.required],
      details:[this.eventSelected!=undefined? this.eventSelected.details : ''],
      Category:[this.eventSelected!=undefined? this.eventSelected.Category : ''],
      ClientId:[this.eventSelected!=undefined? this.eventSelected.clientId : ''],
      eventId:[this.eventSelected!=undefined? this.eventSelected.Id : -1],
    });
  }


  async addEvent() {
    let eventDetails= this.formGroup.value
    await this.adminPg.addEvent(eventDetails).then(a=>{if(a) this.show=false;})
  }

  selectClient(clientId:any){
    this.formGroup.controls['ClientId'].setValue(clientId);
  }

  selectCategory(categoryValue:any){
    this.formGroup.controls['Category'].setValue(categoryValue);
  }

  addNewClient(){
      alert('add new client')
  }
}
