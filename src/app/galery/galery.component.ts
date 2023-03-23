import { Component, OnInit } from '@angular/core';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { Categories } from '../categories-managment/categories.model';
 
export class CategoriesTabs{
Id!:number
Name!:string
isActive!:boolean
images:string[]=[]
}


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
  //allImages:string[][]=[];
  active = [false] ;
  /*categories=[{id:0,name:'צילומי חוץ',isActive:true ,images:this.outdoorPhotoes},
              {id:1,name:'צילומי אירועים',isActive:false,images:this.eventsPhotos},
              {id:2,name:'צילומי מזון',isActive:false,images:this.foodPhotos},
              {id:3,name:'צילומי עיצוב פנים',isActive:false,images:this.InteriorDesignPhotos},
              {id:4,name:'צילומי מוצרים',isActive:false,images:this.productsPhotos},
              {id:5,name:'צילומי סטודיו',isActive:false,images:this.studioPhotos},
             ]*/
 
  categories:CategoriesTabs[]=[];
allImages=[];
 
  currentCategory:string[]=[];

  lastIndex!: number;
  imgs:string[]=[];
  load=true;
  ///images:string[]=[]

  constructor(private loggedInGuardService:LoggedInGuardService,
              private adminPageService:AdminPageService) { }

  
  ngOnInit() {
    this.load=true;
    this.loggedInGuardService.getPublishedImages().subscribe(array=>{
       this.allImages=array;    
       this.adminPageService.getAllCategories().subscribe(c=>{
          this.adminPageService.allCategories = c;
          this.adminPageService.allCategories.forEach(category => {
          var c = new CategoriesTabs();
          c.Id=category.Id;
          c.Name=category.Name;
          c.isActive=false;
          c.images=[];  
          this.allImages.forEach((element:any)=>{
            if (element.Category == c.Id){
              c.images.push(element.PathImg);
            }
      })
        this.categories.push(c);
    });
     this.currentCategory = this.categories[0].images;
   }) 
})
}

   
  setActive(id:number){
    this.categories.map((c)=>{
      c.isActive = false;
      if(c.Id = id){
        c.isActive=true;
      }

    })
   /* this.categories[0].isActive=false;
    this.categories[1].isActive=false;
    this.categories[2].isActive=false;
    this.categories[3].isActive=false;
    this.categories[4].isActive=false;
    this.categories[5].isActive=false;
    this.categories[id].isActive=true;*/
    this.lastIndex = id;
    this.currentCategory=this.categories[id].images;
  }

}
