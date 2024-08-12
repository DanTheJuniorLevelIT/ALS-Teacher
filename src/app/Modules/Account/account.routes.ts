import { Routes } from '@angular/router';
import { AccountmainComponent } from './accountmain/accountmain.component';
import { AccountComponent } from './account/account.component';

export const accountRoute: Routes = [
    {path: 'main', component: AccountmainComponent, 
        children: [
            {path: 'account', component: AccountComponent},
            {path: '', redirectTo: 'account', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'main', pathMatch: 'full'}
];