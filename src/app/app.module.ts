import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GaleryComponent } from './galery/galery.component';
import { GaleryEzorIshiComponent } from './galery-ezor-ishi/galery-ezor-ishi.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddNewClientComponent } from './add-new-client/AddNewClientComponent';
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { ErrComponent } from './err/err.component';
import { EzorIshiComponent } from './ezor-ishi/ezor-ishi.component';
import { HomeComponent } from './home/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ClientsManagmentComponent } from './clients-managment/clients-managment.component';
import { EventsManagmentComponent } from './events-managment/events-managment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeHe from '@angular/common/locales/he';
import { registerLocaleData } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { DiaryComponent } from './diary/diary.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { ClientEventsComponent } from './client-events/client-events.component';
import { CategoriesManagmentComponent } from './categories-managment/categories-managment.component';

registerLocaleData(localeHe);

@NgModule({   
  declarations: [
    AppComponent,      
    ContactUsComponent, 
    GaleryComponent,
    GaleryEzorIshiComponent,
    AdminPageComponent,
    AddNewClientComponent,
    AddNewEventComponent,
    ErrComponent,
    EzorIshiComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ClientsManagmentComponent,
    EventsManagmentComponent,
    DiaryComponent,
    LoginPageComponent,
    ClientEventsComponent,
    CategoriesManagmentComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatIconModule,
    BrowserAnimationsModule,  
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    PhotoGalleryModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatTabsModule,
    AutocompleteLibModule,
    MatToolbarModule,
    MatStepperModule,
    MatRadioModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  
  providers: [],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }