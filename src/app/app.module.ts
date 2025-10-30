import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupComponent } from './components/setup/setup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SurveysComponent } from './components/surveys/surveys.component';
import { AddNewSurveyComponent } from './components/add-new-survey/add-new-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    SurveysComponent,
    AddNewSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
