import { Routes } from '@angular/router';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { SubjectComponent } from './subject/subject.component';
import { ModulesComponent } from './modules/modules.component';
import { ModulesmainComponent } from './modulesmain/modulesmain.component';
import { MatComponent } from './mat/mat.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { LessonComponent } from './lesson/lesson.component';
import { QuestionComponent } from './question/question.component';
import { ProgressComponent } from './progress/progress.component';
import { CheckComponent } from './check/check.component';
import { DiscussComponent } from './discuss/discuss.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { StudentsComponent } from './students/students.component';

export const subjectRoute: Routes = [
    { path: 'main', component: SubjectmainComponent,
        children: [
            { path: 'subject', component: SubjectComponent },
            { path: 'subject/modulesmain/:id', component: ModulesmainComponent,
                children: [
                    { path: 'modules', component: ModulesComponent },
                    { path: 'modules/mat', component: MatComponent },
                    { path: 'modules/assess', component: AssessmentComponent },
                    { path: 'modules/discuss', component: DiscussComponent},
                    { path: 'modules/mat/lesson', component: LessonComponent },
                    { path: 'modules/assess/question', component: QuestionComponent },
                    { path: 'modules/discuss', component: DiscussComponent},
                    { path: 'modules/discuss/discussion', component: DiscussionComponent},
                    { path: 'modules/assess/question/progress', component: ProgressComponent }, 
                    { path: 'modules/assess/question/checking', component: CheckComponent},
                    { path: '', redirectTo: 'modules', pathMatch: 'full' }
                ]
            },
            { path: 'students', component: StudentsComponent},
            { path: '', redirectTo: 'subject', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];