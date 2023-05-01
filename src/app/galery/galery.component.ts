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
  active = [false] ;
  categories:CategoriesTabs[]=[];
  allImages=[];
  currentCategory:string[]=[];
  lastIndex!: number;
  imgs:string[]=[];
  load=true;

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

      //מציג בדף הבית רק את הקטגוריות שיש להם תמונות מפורסמות
      //אחרת אין ענין להציג כפתור שלא מביא שום דבר
       if(c.images.length!=0)
        this.categories.push(c);
    });
    setTimeout(() => {
      this.currentCategory = this.categories[0].images;
    }, 1000); 
   }) 
})
}

   
  setActive(id:number){
    this.categories.map((c)=>{
      c.isActive = false;
      if(c.Id == id){
        c.isActive=true;
        this.currentCategory=c.images;
      }
    })
    this.lastIndex = id;
 }

}
