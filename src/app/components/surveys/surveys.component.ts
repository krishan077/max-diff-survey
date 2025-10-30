import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent {

  surveys: any;
  search !: FormGroup;
  selectedSurvey: any;

  constructor(private _api: ApiService, private _fb: FormBuilder){
    this.getSurveys();
    this.searchValidation();
  }

  getSurveys(){
    this._api.getApi('api/get-maxdiff?comp_id=2').subscribe((res: any) => {
      if(res && !res.error){
          console.log(res);
          this.surveys = res.data;
      } else {
        console.log(res);
      }
    });
  }

  searchValidation() {
    this.search = this._fb.group({
      value: ['']
    });
  }

  
}
