export class Categories{
    Id:number=0;
    Name:string=''; 
    
    constructor(){}
  
    static convert(category: any): Categories {
      let c= new Categories();
      if(category){
      c.Id=category.Id;
      c.Name=category.Name;
      }
     return c; 
    }
}