import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { AppModule } from './app.module';

@Component({    
  selector: 'app-root',   
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private route: ActivatedRoute, private logInSr: LoggedInGuardService) { }

}
