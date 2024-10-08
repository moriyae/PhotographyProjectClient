import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { ClientPageService } from 'src/services/client-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {
  details = {
    mail: '',
    sub: 'סיסמא זמנית',
    txt: ''
  }
  phone!: string;
  code!: string;
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  client!: Client;
  clicked = false;
  show: boolean = false;
  phoneExists=false;
  vertifyPassword='';
  temporaryPassword='';
  blockNextStep='';
  hide=true;
  succeed=false;

  step1=false;
  step2=false;
  step3=false;

  step1FormGroup!:FormGroup;
  step2FormGroup!:FormGroup;
  step3FormGroup!:FormGroup;

  constructor(private router: Router, 
              private adminPageService:AdminPageService,
              private loggedInGuardService: LoggedInGuardService, 
              private formBuilder: FormBuilder,
              private clientPageService: ClientPageService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.step1FormGroup = this.formBuilder.group({
       phone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.step2FormGroup=this.formBuilder.group({
      temporaryPassword: ['', Validators.required ]
    });

    this.step3FormGroup=this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  async sendTemporaryPassword() {
    sessionStorage.clear()
    this.temporaryPassword = Math.floor(Math.random() * 10).toString()
    for (let i = 0; i < 5; i++)
      this.temporaryPassword += (Math.floor(Math.random() * 10)).toString()
        this.details.mail = this.client.Mail;
        this.details.txt = `שלום ${this.client.FirstName}, סיסמתך הזמנית היא: ${this.temporaryPassword}`
        this.loggedInGuardService.send(this.details).subscribe(r=> {

        })
        this.phoneExists=true;
        this.clicked = true;
        this.step1=true;
  }

 async changePass() {
    let data = { id: this.client.Id, 
                 newPass: this.step3FormGroup.controls['password'].value }
    let ans = await this.clientPageService.changePassword(data); 
        if (ans!=undefined) { 
          this.succeed=true;
          this.client.UserPassword=data.newPass
          this.loggedInGuardService.setCurrentClient(this.client.Id)
          this.loggedInGuardService.checkNameAndPass({username:this.client.UserName,password:this.client.UserPassword},false)
        }
        else{
          console.log('error on change password')
        }
  }

  async login(data:any){
    var user={
      username:this.client.UserName,
      password:data.newPass
    }

     await this.loggedInGuardService.checkNameAndPass(user)
    .then(ans=>{
    if (!ans)
      console.log("no")
    else{
      console.log("yes")
      this.client = ans;
      this.loggedInGuardService.currentClient=ans;
   } })
  }
  

  checkPhone(){
    this.phoneExists=false;
    if(this.phone != null && this.phone!=undefined)
    if(this.phone.length==10){
      this.loggedInGuardService.getAllClient(`Phone='${this.phone}'`).subscribe(c => {
        if(c.length>0){
          this.client = c[0];
          console.log(c);
          this.phoneExists=true;
    }})
    }
  }
}
