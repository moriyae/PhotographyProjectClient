import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/login-page/login-page.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  logIn!: boolean;

  constructor(private router: Router,
              public matDialog:MatDialog){ }
  
  //משנה את העיצוב של ההידר בגלילה
  @HostListener('window:scroll', ['$event'])
  
  onWindowScroll() {
    let header = document.getElementById('options') as HTMLElement;
    let op1 = document.getElementById('op1') as HTMLElement;
    let op2 = document.getElementById('op2') as HTMLElement;
    let op3 = document.getElementById('op3') as HTMLElement;
    let op4 = document.getElementById('op4') as HTMLElement;
    if (window.pageYOffset > header.clientHeight) {
      header.classList.add('navbar-inverse');
      op1.classList.add('titles-inverse');
      op2.classList.add('titles-inverse');
      op3.classList.add('titles-inverse');
      op4.classList.add('titles-inverse');
    } 
    else {
      header.classList.remove('navbar-inverse');
      op1.classList.remove('titles-inverse');
      op2.classList.remove('titles-inverse');
      op3.classList.remove('titles-inverse');
      op4.classList.remove('titles-inverse');
    }
  }

  openLogInDialog(){
    this.matDialog.open(LoginPageComponent,{
      height: '60%',
  });
  }

  changePath(path:any) {
    this.router.navigate([path])
  }

  clr(path:any) {   
    this.logIn = false
    sessionStorage.clear()
    this.router.navigate([path])
  }  
}
