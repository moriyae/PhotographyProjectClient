export class Client{
    FirstName:string='';
    LastName:string='';
    Phone:string='';
    Mail:string='';
    UserName:string='';
    UserPassword:string='';
    Id:number=0;
    IsAdmin!:number
    
    
    constructor(){}
  
    static convert(client: any): Client {
      let c= new Client();
      if(client){
      c.FirstName=client.FirstName;
      c.LastName=client.LastName;
      c.Phone=client.Phone;
      c.Mail= client.Mail;
      c.UserName=client.UserName
      c.UserPassword=client.UserPassword;
      c.Id=client.Id;
      c.IsAdmin= client.IsAdmin;
      }
     return c;
  
    }
}