import { Routes } from '@angular/router';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { SubjectComponent } from './subject/subject.component';
import { ModulesComponent } from './modules/modules.component';
import { ModulesmainComponent } from './modulesmain/modulesmain.component';
import { MatComponent } from './mat/mat.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { LessonComponent } from './lesson/lesson.component';
import { QuestionComponent } from './question/question.component';

export const subjectRoute: Routes = [
    {path: 'main', component: SubjectmainComponent,
        children: [
            { path: 'subject', component: SubjectComponent},
            {path: 'subject/modulesmain', component: ModulesmainComponent,
                children: [
                    { path: 'modules', component: ModulesComponent },
                    { path: 'modules/mat', component: MatComponent },
                    { path: 'modules/assess', component: AssessmentComponent},
                    { path: 'modules/mat/lesson', component: LessonComponent },
                    { path: 'modules/assess/question', component: QuestionComponent },
                    { path: '', redirectTo: 'modules', pathMatch: 'full' }
                ]
            },
            { path: '', redirectTo: 'subject', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];