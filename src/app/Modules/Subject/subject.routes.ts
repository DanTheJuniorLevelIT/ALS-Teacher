import { Routes } from '@angular/router';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { SubjectComponent } from './subject/subject.component';
import { ModulesComponent } from './modules/modules.component';
import { ModulesmainComponent } from './modulesmain/modulesmain.component';

export const subjectRoute: Routes = [
    {path: 'main', component: SubjectmainComponent,
        children: [
            { path: 'subject', component: SubjectComponent},
            {path: 'subject/modulesmain', component: ModulesmainComponent,
                children: [
                    { path: 'modules', component: ModulesComponent },
                    { path: '', redirectTo: 'modules', pathMatch: 'full' }
                ]
            },
            { path: '', redirectTo: 'subject', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];