import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSurveyComponent } from './add-new-survey.component';

describe('AddNewSurveyComponent', () => {
  let component: AddNewSurveyComponent;
  let fixture: ComponentFixture<AddNewSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
