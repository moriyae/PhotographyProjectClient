import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = "http://localhost:8080/api/client"
@Injectable({
  providedIn: 'root'
})

//סרביס לפונקציונליות של לקוח
export class ClientPageService {

  constructor(private httpClient: HttpClient) { }

  //מחזיר את כל האירועים לפי קוד לקוח
  async getEvents(id:any){
    console.log(id)
    return this.httpClient.get(`${url}/getEvents/${id}`, { withCredentials: true, reportProgress: true }).toPromise()
  }

  //מחזיר את כל התמונות לפי קוד אירוע
  getFiles(id:any): Observable<any> {
    var s = this.httpClient.get(`${url}/${id}`, { withCredentials: true, reportProgress: true });
    return s
  }

  //שומר בחירה של תמונות 
  updateImgSelected(progressInfos:any) {
    this.httpClient.post(`${url}/updateImgSelected`, progressInfos, {
      withCredentials: true, reportProgress: true,
      responseType: 'json'
    }).subscribe(u => console.log(u))
  }

  //מוריד תמונה
  async downLoadImg(nameImg:any) {
    let res  ;
    if (nameImg.length > 1) {
      await this.httpClient.post(`${url}/downLoad`, nameImg, { withCredentials: true, responseType: 'arraybuffer' }).toPromise().then(a => res = a)
    }
    else {
      await this.httpClient.post(`${url}/downLoad`, nameImg, {
        withCredentials: true, responseType: 'blob', headers: new HttpHeaders().append('content-type', 'application/json')
      }).toPromise().then(a => res = a)
    }
    return res;
  }

  //משנה סיסמה כשמשתמש שוכח
  changePassword(data: any): Observable<any>  {
    console.log(data.id)
    return this.httpClient.post<any>(`${url}/changePass`,data, { withCredentials: true, reportProgress: true })   
  }

  //משנה את סטטוס הפרסום של תמונה להפך ממה שהוא
  async changePublicationOfImage(img:any){
    let ans;
      await this.httpClient.post(`${url}/changePublicationOfImage`, img, { withCredentials: true, reportProgress: true }).toPromise().then(e => {console.log(e); ans=e})
      return ans;
    }
}