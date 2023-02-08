import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Client } from 'src/app/add-new-client/add-new-client.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { interval, lastValueFrom } from 'rxjs';
import { query } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

const url = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})

//סרביס שמבצע לוגין ושומר את הנתונים הרלוונטים למשתמש הנוכחי
export class LoggedInGuardService implements CanActivate {

  isLoggedIn = false;
  mesege!: string;
  client!: Client;
  isAdmin = false;
  clients: Client[]=[];
  currentClient?: Client;

  constructor(private http: HttpClient, 
              private router: Router,
              private matDialog:MatDialog) { }

  //מחזיר מערך של כל הלקוחות לפי תנאי שמקבל בשאילתא
  getAllClient(query:any):Observable<Client[]>
  {
    var clients= this.http.get<Client[]>(`${url}getAllClient/${query}`);
    clients.subscribe(c=>{this.clients=c});
    return clients;
  }

    //מחזיר מערך של כל הלקוחות
    getAllClients():Observable<Client[]>
    {
      var clients= this.http.get<Client[]>(`${url}getAllClients`);
      clients.subscribe(c=>{this.clients=c});
      return clients;
    }

  //מקבל תז של לקוח ושומר בלקוח נוכחי את הלקוח הזה
  setCurrentClient(clientId: number) {
    this.clients.forEach(c=>{  
      if(c.Id==clientId){ 
        this.currentClient=c;
      }
    })
  }

  //מאתחל את הלקוח הנוכחי ל UNDEFINED
  setCurrentClientUndefined() {
    this.currentClient = undefined;
  }

  //מחזיר את הלקוח הנוכחי אם קיים, אחרת מחזיר נל
  getCurrentClient() {
    if (this.currentClient){
      return this.currentClient;
    }
    else
      return null;
  }

  //מבצע פעולת לוגין ומנתב לדף המתאים - לקוח, מנהל או שגיאה
  async checkNameAndPass(user:any, TemporaryPassword? :boolean) {
    await this.http.post(`${url}login`, user, { withCredentials: true, reportProgress: true }).toPromise()
    .then(a => {
      if (a == false) {
        return a;
      }
      else {
        this.client = Client.convert(a);
        if (this.client != undefined) {
          this.isLoggedIn = true;
          if (this.client.IsAdmin) {
            this.isAdmin = true
            this.matDialog.closeAll();
            this.router.navigate(['admin-page'])
          }
          else {
            this.isAdmin = false
            if(!TemporaryPassword){
              this.router.navigate(['ezorIshi'])
              this.matDialog.closeAll();
            }
          }
        }
        return a;
      }
    }, error => {
          this.mesege = "בעיה בחיבור למסד נתונים"
          this.router.navigate(['err'])
       })
    return this.client;
  }
  
  //מחזיר האם המשתמש הוא מנהל
  isAdminUser() {
    return this.isAdmin;
  }

  //מבצע יציאת משתמש-מנקה את הנתונים ומנתב חזרה לדף הבית
  async exit() {
    await this.http.post('http://localhost:8080/exit', {}, { withCredentials: true, reportProgress: true }).toPromise().then(e => console.log(e))
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  //בודק מי יכול להפעיל כל ניתוב
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isLoggedIn) {
      this.router.navigate(['contact']);
      return false;
    }
    return this.isLoggedIn;
  }

    //שולח הודעה מהצור קשר
    send(details:any): Observable<any> {
      var s = this.http.post(`${url}sendMail`, details);
      return s
    }
  
    //מחזיר את כל התמונות המפורסמות לגלריה של הבית
    getPublishedImages( ):Observable<any>{
      return this.http.get<any[]>(`${url}getPublishedImages`);
    }

}
