import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent{
  userId = {
    userName: '',
    pass: ''
  }
  forgotPassword=false;
  hide=true;
  errMsg="";
  messege='';
  client!: Client;
  name!: string;
  formGroup!: FormGroup;
  unv: boolean = true;
  submited = false;

  @Output() login: EventEmitter<any> = new EventEmitter()

  constructor(private matDialog:MatDialog,
              private logInServic: LoggedInGuardService, 
              private formBuilder: FormBuilder) { 
    this.createForm();
  }
  
  createForm(){
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  async enter() {
    sessionStorage.clear()
    const data = {
      username: this.userId.userName,
      pass: this.userId.pass
    };
    let ans = await this.logInServic.checkNameAndPass(this.formGroup.value)
    if (!ans)
      this.messege = "שם משתמש או סיסמא שגויים"
    else{
      this.messege=''
      this.client = ans;
      this.logInServic.currentClient=ans;
    }
  }

  //שכחתי סיסמה
  changePass() {
    this.forgotPassword=true;
    this.matDialog.open(ForgotPasswordComponent)
  }
}
