import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { AddNewSurveyComponent } from './components/add-new-survey/add-new-survey.component';
import { SurveysComponent } from './components/surveys/surveys.component';

const routes: Routes = [
  {
    path: 'add-survey',
    component: AddNewSurveyComponent
  },
  {
    path: '',
    component: SurveysComponent
  },
  {
    path: 'setup',
    component: SetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
