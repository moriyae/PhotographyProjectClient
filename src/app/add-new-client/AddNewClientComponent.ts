import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { ConfirmedValidator } from '../forgot-password/forgot-password.component';
import { Client } from './add-new-client.model';


@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent implements OnInit {
  status!: string | null;
  user!: Client | null;
  formGroup!: FormGroup;
  valueBtn!: string;
  message!: string;
  show: boolean = true;
  isAd = false;
  submitted: boolean = false;
  hide = true;
  details = {
    mail: '',
    sub: ' שם משתמש וסיסמא לאתר',
    txt: ''
  };
  constructor(private adminPg: AdminPageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private logIn: LoggedInGuardService) {
    this.route.paramMap.subscribe(status => { this.status = status.get("status"); console.log(status.get("status")); });
    this.createForm();
    this.isAd = this.logIn.isAdmin;
  }

  createForm() {
    console.log(this.logIn.getCurrentClient());
    this.user = this.logIn.getCurrentClient();
    this.formGroup = this.formBuilder.group({
      firstName: [this.user ? this.user.FirstName : '', [Validators.required, Validators.pattern("^[a-zA-Zא-ת ]+$")]],
      lastName: [this.user ? this.user.LastName : '', [Validators.required, Validators.pattern("^[a-zA-Zא-ת ]+$")]],
      phone: [this.user ? this.user.Phone : '', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      mail: [this.user ? this.user.Mail : '', [Validators.required, Validators.email]],
      username: [this.user ? this.user.UserName : '', [Validators.required]],
      isAdmin:"0",
      password: [this.user ? this.user.UserPassword : '', Validators.compose([Validators.required])],
      confirmPassword: [this.user ? this.user.UserPassword : '', [Validators.required]],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  ngOnInit() {
    if (this.status == "add") {
      this.valueBtn = "הוסף";
    }
    else {
      this.valueBtn = "עדכן";
    }
  }

  // get registerFormControl() {  
  //   return this.formGroup.controls;
  // }
  async addClient() {
    console.log(this.formGroup.value);
    let userDetails = {
      user: this.formGroup.value,
      id: this.user ? this.user.Id : -1
    };
    console.log(this.user?.Id);

    let ans = await this.adminPg.addNewClient(userDetails);


    if (ans != undefined) {
      this.message = ans['message'];
      this.logIn.setCurrentClientUndefined();
      this.details.mail = '' + this.formGroup.value['mail'];
      this.details.txt = `שלום ${this.formGroup.value['firstName']}.\nשם המשתמש שלך הוא: ${this.formGroup.value['username']}.\n סיסמתך היא:${this.formGroup.value['password']}.`;
      console.log(this.details);

      this.logIn.send(this.details).subscribe(r => { console.log(r); });
    }
    if (this.message != 'נא לבחור סיסמא אחרת')
      this.show = false;
  }
}
