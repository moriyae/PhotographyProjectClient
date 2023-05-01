import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPageService } from 'src/services/admin-page.service';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { Client } from '../add-new-client/add-new-client.model';
import {Location} from '@angular/common';
import { Categories } from './categories.model';

@Component({
  selector: 'app-categories-managment',
  templateUrl: './categories-managment.component.html',
  styleUrls: ['./categories-managment.component.css']
})
export class CategoriesManagmentComponent {
  categories: Categories[]=[];
  category: Categories = new Categories();
  resultArray!:any;
  searchText!:any;

  constructor(private adminPageService: AdminPageService, 
              private logInService: LoggedInGuardService,
              public  matDialog:MatDialog,
              private router: Router,
              private location:Location,
              private route:ActivatedRoute) { }

  setCurrentCategory(category:Categories){
    //console.log(category)
    this.category = category;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  closeDialog(){
    this.matDialog.closeAll();
    this.category = new Categories() ;
  }

 
  addCategory() {
    if (this.category.Id == 0 ){
       this.adminPageService.addCategory(this.category).subscribe(a=>{
        if(a==true) this.ngOnInit();
        else(alert('שגיאה'))
       })
       this.closeDialog()
    }
    else{
      console.log('update')
      this.closeDialog()
    }
  }

 async getAllCategories() {
    this.adminPageService.getAllCategories().subscribe(c=>{
      this.categories=this.adminPageService.allCategories;
  })}

  refresh(){
    this.ngOnInit();
  }
}
