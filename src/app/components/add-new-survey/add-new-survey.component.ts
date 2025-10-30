import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-new-survey',
  templateUrl: './add-new-survey.component.html',
  styleUrl: './add-new-survey.component.scss'
})
export class AddNewSurveyComponent {

  general!: FormGroup;
  md_id: any;

  // declare availableConcept
  availableConcept: number = 0;

  constructor(private _api: ApiService, private _fb: FormBuilder){
    this.createGenralForm();

    // Auto-calc when any relevant field changes
    this.general.valueChanges.subscribe(val => {
      if (val.no_of_concepts && val.concept_per_set && val.no_of_repeatition) {
        this.setsCalculation(val.no_of_concepts, val.concept_per_set, val.no_of_repeatition);
      }
    });
  }

  createGenralForm(){
    this.general = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      no_of_concepts: [2, Validators.compose([Validators.required, Validators.min(2), Validators.max(100)])],
      concept_per_set: [2, Validators.compose([Validators.required, Validators.min(2), Validators.max(10)])],
      no_of_repeatition: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      no_of_sets: [{value: 1, disabled: true}, Validators.compose([Validators.required, Validators.min(1)])],
      positive_tag: null,
      negative_tag: null
    });
  }

  setsCalculation(totalConcept: number, conceptSet: number, setRepetition: number){
    this.availableConcept = totalConcept * setRepetition;
    const result = this.availableConcept / conceptSet;

    if (result) {
      this.general.get('no_of_sets')?.setValue(Math.ceil(result), {emitEvent: false});
    }
  }

  submitGeneral(){
    const params = this.general.getRawValue(); // FIXED
    this._api.postApi('api/maxdiff', params).subscribe((res: any) => {
      if(res && !res.error){
        if(res.id){
          this.md_id = res.id;
        }
      } else {
        console.log(res);
      }
    });
  }
}
