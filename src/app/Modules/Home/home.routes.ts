import { Routes } from '@angular/router';
import { HomemainComponent } from './homemain/homemain.component';
import { HomeComponent } from './home/home.component';

export const homeRoute: Routes = [
    {path: 'main', component: HomemainComponent, 
        children: [
            {path: 'home', component: HomeComponent},
            {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'main', pathMatch: 'full'}
];