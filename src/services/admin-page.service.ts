import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInGuardService } from './logged-in-guard.service';

const url = "http://localhost:8080/api/admin"
let isAdmin = false
@Injectable({
  providedIn: 'root'
})

//סרביס לפונקציונליות של מנהל
export class AdminPageService {

  eventSelected!:any|undefined;
  allEvents:any[]=[];
  allClients:any[]=[];

  constructor(private http: HttpClient,
              private router: Router, 
              private logIn: LoggedInGuardService) { }

  //העלאת תמונה/תמונות לאירוע מסוים
  uploads(file: File): Observable<HttpEvent<any>> {
    console.log("from uploads service")
    const formData: FormData = new FormData();
    formData.append('userfiles', file);
    const req = new HttpRequest('POST', `${url}/upLoad`, formData, {
      reportProgress: true,
      withCredentials: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //רישום לקוח חדש ע"י מנהל בלבד
  async addNewClient(client:any) {
    let ans;
    await this.http.post(`${url}/addNewClient`, client, {
      reportProgress: true,
      responseType: 'json', withCredentials: true
    }).toPromise().then(e => ans = e)
    return ans
  }

  //הוספת אירוע חדש
  async addEvent(event:any) {
    let ans;
    await this.http.post(`${url}/addEvent`, event, {
      reportProgress: true,
      responseType: 'json', withCredentials: true,
    }).toPromise().then(u => ans=u);
    return ans;
  }

  //מחזיר את כל האירועים
  async getAllEvents(){
    var a= this.http.get(`${url}/getAllEvents`, { withCredentials: true, reportProgress: true }).toPromise();
    a.then((e:any)=>{
      this.allEvents=e;
    })
    return a;
  }

  //מחזיר את כל האירועים ולכל אירוע את הלקוח שלו
  async getAllEventsWithDetails(){
    return this.http.get(`${url}/getAllEventsWithDetails`, { withCredentials: true, reportProgress: true }).toPromise()
  }

  //מקבל קוד אירוע ושומר באירוע נוכחי את האירוע המתאים
  setCurrentEvent(index: number) {
    this.allEvents.forEach(e=>{  
      if(e.Id==index){ 
        this.eventSelected=e;
        return;
      }
    })
  }

  //מעדכן את האירוע הנוכחי להיות נל
  setCurrentEventNull() {
    this.eventSelected=null;
  }

  //מחיקת אירוע ע"י מנהל בלבד
  deleteEvent(id:any):Observable<any> {
    console.log(id)
    return this.http.get(`${url}/deletingAnEvent/${id}`, { withCredentials: true, reportProgress: true })
  }

  //מחיקת תמונה
  deleteImg(id:any) {
    let c = this.http.post(`${url}/deletingImg`, id, { withCredentials: true, reportProgress: true })
    return c;
  }
 
  //בודק האם המשתמש יכול להפעיל ניתוב מסוים לפי ההרשאה שלו - מנהל או לקוח
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    isAdmin = this.logIn.isAdminUser();
    if (!isAdmin) {
      this.router.navigate(['contact']);
      return false;
    }
    return isAdmin;
  }
}
