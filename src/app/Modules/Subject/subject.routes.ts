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
import { ViewfileComponent } from './viewfile/viewfile.component';
import { AddmatComponent } from './addmat/addmat.component';
import { UpdateLessonComponent } from './update-lesson/update-lesson.component';
import { UploadComponent } from './upload/upload.component';

export const subjectRoute: Routes = [
    { path: 'main', component: SubjectmainComponent,
        children: [
            { path: 'subject', component: SubjectComponent },
            { path: 'subject/modulesmain/:id', component: ModulesmainComponent,
                children: [
                    { path: 'modules', component: ModulesComponent },
                    { path: 'modules/:moduleid/mat', component: MatComponent }, // Dynamic moduleid for mat
                    { path: 'modules/:moduleid/addmat', component: AddmatComponent },
                    { path: 'modules/:moduleid/updateLesson', component: UpdateLessonComponent },
                    { path: 'modules/:moduleid/upload', component: UploadComponent},
                    { path: 'modules/:moduleid/assess', component: AssessmentComponent },
                    { path: 'modules/:moduleid/discuss', component: DiscussComponent },
                    { path: 'modules/:moduleid/mat/lesson', component: LessonComponent },
                    { path: 'modules/:moduleid/assess/question/:questionid', component: QuestionComponent },
                    { path: 'modules/:moduleid/discuss/:discid/discussion', component: DiscussionComponent },
                    { path: 'modules/:moduleid/assess/question/:questionid/progress', component: ProgressComponent }, 
                    { path: 'modules/:moduleid/assess/question/:questionid/checking', component: CheckComponent },
                    { path: 'modules/:moduleid/assess/question/:questionid/file', component: ViewfileComponent },
                    { path: '', redirectTo: 'modules', pathMatch: 'full' }
                    // { path: 'modules/discuss/:id/discussion', component: DiscussionComponent},
                ]
            },
            { path: '', redirectTo: 'subject', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
];