import { Routes } from '@angular/router';
import { MessagemainComponent } from './messagemain/messagemain.component';
import { MessageComponent } from './message/message.component';
import { ViewmessageComponent } from './viewmessage/viewmessage.component';

export const messageRoute: Routes = [
    {path: 'main', component: MessagemainComponent, 
        children: [
            {path: 'message', component: MessageComponent},
            {path: 'message/view', component: ViewmessageComponent},
            {path: '', redirectTo: 'message', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'main', pathMatch: 'full'}
];