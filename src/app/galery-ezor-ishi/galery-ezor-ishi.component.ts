import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { AdminPageService } from 'src/services/admin-page.service';
import { ClientPageService } from 'src/services/client-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';

@Component({
  selector: 'app-galery-ezor-ishi',
  templateUrl: './galery-ezor-ishi.component.html',
  styleUrls: ['./galery-ezor-ishi.component.css']
})

export class GaleryEzorIshiComponent implements OnInit {
  dialogOpen=true
  allImges!: Observable<any>;
  imagesInfos:any[] = [];
  sumIsSelected!: number  
  eventId!: string
  progressInfos = [];
  selectedFiles!: FileList;
  isAd!: boolean
  message = '';
  message1 = [];
  details={}
  selectedImgsText='תמונות שנבחרו';
  formData: FormData = new FormData();
  popupOpen: boolean = false;
  popup2Open: boolean = false;
  progress = 0;
  enableButton=false;
  eventClient:Client=new Client;
  eventName='';

  constructor(private cliPg: ClientPageService,
              private adminPg: AdminPageService,
              private location:Location,
              private logIn: LoggedInGuardService) { }

  ngOnInit() {
    this.imagesInfos = [];
    this.sumIsSelected = 0
    this.eventId = sessionStorage.getItem('IDEvent')+"";
    var cId=sessionStorage.getItem('eventClientId')+"";
    this.eventName=sessionStorage.getItem('eventName')+'';
    this.logIn.getAllClient(`Id=${cId}`).subscribe(c=>{
      console.log(c)
      this.eventClient =c[0] as Client;
    });

    this.allImges = this.cliPg.getFiles(this.eventId);
    console.log(this.eventId)

    this.allImges.subscribe(i => { 
      console.log(i)
      this.imagesInfos = i
      this.imagesInfos.forEach(img => { if (img['IsSelected']) this.sumIsSelected++ })
      this.isAd = this.logIn.isAdminUser()
      console.log(this.imagesInfos)
    })
  }
 
  viewImgSelected() {
    if(this.selectedImgsText==='תמונות שנבחרו'){
      this.imagesInfos = this.imagesInfos.filter((img) => img['IsSelected'] == true)
      console.log(this.imagesInfos)
      this.selectedImgsText='כל התמונות'
    }

    else{
      this.allImges.subscribe(i => {
        this.sumIsSelected=0
        this.imagesInfos = i
        this.imagesInfos.forEach(img => { if (img['IsSelected']) this.sumIsSelected++ })
        this.isAd = this.logIn.isAdminUser()
        console.log(this.imagesInfos)
      })
      this.selectedImgsText='תמונות שנבחרו' 
    }
  }   

  viewSelect(img:any) {
    if(this.isAd==true)
      return;
    img.IsSelected = !img.IsSelected
    if (img.IsSelected)
      this.sumIsSelected++
    else
      this.sumIsSelected--
  }

  saveImgSelected() {
    this.cliPg.updateImgSelected(this.imagesInfos)
  }
  
  onSelectedFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles = async () => {
    this.message = '';
    this.formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++)
      this.formData.append('userfiles', this.selectedFiles[i])
  }

 async downLoad(img:any) {
  console.log(img)
    let nameImg=[img]
    let res= await this.cliPg.downLoadImg(nameImg)
  
     if(res){
      saveAs(res,img.Name)
     }
  }

  async downLoadAllImg(){
    let names: any[]=[]
    this.imagesInfos.forEach(img =>{names.push(img.Name)});
    let res= await this.cliPg.downLoadImg(names)
    if(res){
    var file = new Blob([res], { type: 'application/zip' });

    saveAs(file,`img.zip`)
    }
  }

  deleteImg(id:any, name:any) {
    this.details = {
      id: id,
      field: 'Id',
      name: name,
      idEvent: this.eventId
    }
    this.message=`האם אתה בטוח שאתה רוצה למחוק את ${name.Name}?` 
  }

  deleteAllImg() {
    console.log(this.eventId)
    this.details = {
      id: this.eventId,
      field: 'EventId',
    }
    this.message='האם אתה רוצה למחוק את כל התמונות?'
    this.popup2Open=true
  }

  setPopupOpen(){
  this.popupOpen = true;
  this.progressInfos = []; 
  this.message1 = []
  }

  closePopup(){
    this.popupOpen=false;
  }

  selectFiles(event:any): void {
    this.message1 = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    if(this.selectedFiles.length>0){
      this.enableButton=true;
    }
    console.log(this.selectedFiles);
  }
  
  uploadFile(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i,this.selectedFiles[i]);
      }
    }

    setTimeout(() => {
      this.ngOnInit();
      this.enableButton=false;
    }, 1000);
  }

  upload(idx: number, file: File): void {
    
    if (file) {
      this.adminPg.uploads(file).subscribe(
        a=>console.log(a)    
        )
    }
  }

  
  beforeDeleted(yesNo: boolean){
    if(yesNo){
      this.adminPg.deleteImg(this.details).subscribe(ans => {console.log(ans), this.ngOnInit()})
    }
    this.popup2Open=false
  }
 
   async imgSelected(img:any){
      if(img.isPublished==true)
         await this.cliPg.deleteImgFromPublic(img);
      else
        await this.cliPg.imgSelected(img);
     /* this.cliPg.changePublicationOfImage(img).then((a:any)=>{
     */ var value= img.isPublished==true?false:true;
        this.imagesInfos.forEach(element=>{
          if(element.Id==img.Id){
            element.isPublished=value;
          }})
    } 

    back(){
      this.location.back();
      this.adminPg.setCurrentEventNull();
    }
}