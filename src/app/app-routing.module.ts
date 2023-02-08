import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { EzorIshiComponent } from './ezor-ishi/ezor-ishi.component';
import { LoggedInGuardService } from 'src/services/logged-in-guard.service';
import { AdminPageService } from 'src/services/admin-page.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GaleryComponent } from './galery/galery.component';
import { GaleryEzorIshiComponent } from './galery-ezor-ishi/galery-ezor-ishi.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import { AddNewEventComponent } from './add-new-event/add-new-event.component';
import { ErrComponent } from './err/err.component';
import { ClientsManagmentComponent } from './clients-managment/clients-managment.component';
import { EventsManagmentComponent } from './events-managment/events-managment.component';
import { DiaryComponent } from './diary/diary.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ClientEventsComponent } from './client-events/client-events.component';


const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent },
    {path: 'login', component: LoginPageComponent },
    {path: 'sign-up', component: AddNewClientComponent },
    {path: 'contact-us', component: ContactUsComponent },
    {path: 'galery', component: GaleryComponent },
    {path: 'galery-ishi', component: GaleryEzorIshiComponent,canActivate:[LoggedInGuardService] },
    {path: 'admin-page', component: AdminPageComponent,canActivate:[AdminPageService] ,children:[  
        {path:'clients-managment',component:ClientsManagmentComponent,children:[
            {path: 'client/:status', component: AddNewClientComponent },
        ]},
        {path:'events-managment',component:EventsManagmentComponent,children:[
            {path:'event',component:GaleryEzorIshiComponent},
            {path:'add-event',component:AddNewEventComponent},
            {path: 'client/:status', component: AddNewClientComponent },
        ]},
        {path:'diary',component:DiaryComponent,children:[
            {path:'event',component:GaleryEzorIshiComponent},
            {path:'add-event',component:AddNewEventComponent}
        ]},
        {path:'profile/:status',component:AddNewClientComponent},
        {path:'event',component:GaleryEzorIshiComponent},
        {path: 'ezorIshi', component: EzorIshiComponent},
    ]},
    {path: 'err', component:  ErrComponent},
    {path: 'ezorIshi', component: EzorIshiComponent, canActivate:[LoggedInGuardService],children:[
        {path:'my-events',component:ClientEventsComponent,children:[
            {path:'event',component:GaleryEzorIshiComponent},
        ]},
        {path:'profile/:status',component:AddNewClientComponent},
        {path:'event',component:GaleryEzorIshiComponent},

    ] },
    {path: 'kesher', component: ContactUsComponent },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }