import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar ,MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  formGroup!: FormGroup;
  user!: {
    name: string;
    phone: string;
    mail: string;
    message: string
  }
  submitted!:any
  details={
    mail: 'shmuelphotographer1@gmail.com',
    sub: '',
    txt: ''
  }

  constructor(private loggedInGuardService:LoggedInGuardService, 
              private formBuilder: FormBuilder,
              private snackBar:MatSnackBar) { }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern("^[a-zA-Zא-ת]+$")]],  
      phone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]], 
      mail: ['', [Validators.required, Validators.email]],
      message: ['',Validators.required]   
    })
  }   

  sendMail(){
    this.loggedInGuardService.send(this.details).subscribe(r=> {
      let config = new MatSnackBarConfig();
      config.panelClass = ['custom-class'];
      this.snackBar.open('ההודעה נשלחה בהצלחה, ניצור איתך קשר:)','X',config)
      this.ngOnInit();
    })
  }

  getImgPath(name: string) {

    return `${environment.imagesPath}${name}.jpg`
  }
  get registerFormControl() {
    
    return this.formGroup.controls;
  }

  contactUs(){

    this.details.sub="צור קשר";
    this.details.txt = `שם: ${this.formGroup.value.name}\nטלפון: ${this.formGroup.value.phone}\nמייל: ${this.formGroup.value.mail}\nהודעה:\n${this.formGroup.value.message}`;
    this.sendMail()
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  i(){
    alert("נכנס לפונקציה")
  }

  ins(a:any){
console.log(a)
  }
  
  ch(){alert("dfds")}
 
  

 
}

