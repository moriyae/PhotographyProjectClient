import { Component, OnInit } from '@angular/core';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
                         
@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',

  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {
  Events: any[] = [];
  outdoorPhotoes:string[]=[];
  eventsPhotos:string[]=[];
  foodPhotos:string[]=[];
  InteriorDesignPhotos:string[]=[];
  productsPhotos:string[]=[];
  studioPhotos:string[]=[];
  active = [false,false,false,false,false,false]
  categories=[{id:0,name:'צילומי חוץ',isActive:true ,images:this.outdoorPhotoes},
              {id:1,name:'צילומי אירועים',isActive:false,images:this.eventsPhotos},
              {id:2,name:'צילומי מזון',isActive:false,images:this.foodPhotos},
              {id:3,name:'צילומי עיצוב פנים',isActive:false,images:this.InteriorDesignPhotos},
              {id:4,name:'צילומי מוצרים',isActive:false,images:this.productsPhotos},
              {id:5,name:'צילומי סטודיו',isActive:false,images:this.studioPhotos},
             ]

  currentCategory=this.categories[0].images;

  lastIndex!: number;
  imgs:string[]=[];
  load=true;
  images:string[]=[]

  constructor(private loggedInGuardService:LoggedInGuardService) { }

  
  ngOnInit() {
    this.load=true;
 
     this.loggedInGuardService.getPublishedImages().subscribe(array=>{
     array.forEach((element:any)=>{
       this.categories.find(c=>c.name==element.Category)?.images.push(element.PathImg)})})
   }
   
  setActive(id:number){
    this.categories[0].isActive=false;
    this.categories[1].isActive=false;
    this.categories[2].isActive=false;
    this.categories[3].isActive=false;
    this.categories[4].isActive=false;
    this.categories[5].isActive=false;
    this.categories[id].isActive=true;
    this.lastIndex = id;
    this.currentCategory=this.categories[id].images;
  }

}
