import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent implements OnInit {

  setUpTabs = ["Concepts", "Features", "Preview"];
  selectedTab: any = 0;
  surveyForm: any;
  editData: any = [];
  availableConcept: number = 2;
  md_id: number = 0;
  imageUrl = '';
  editImageUrl = '';
  total_concepts: any;
  concept_uploaded = 0;
  concepts: any;
  surveyData: any = JSON.parse(localStorage.getItem('surveyData') || '{}');

  constructor(private _fb: FormBuilder, private _api: ApiService, private route: ActivatedRoute , private router : Router) {
    this.createForm();
    this.route.queryParams.subscribe((params) => {
      this.md_id = params['md_id'];
      this.total_concepts = params['total_concepts']
    })
    console.log(this.md_id);
    this.getConcepts();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.surveyForm);
     this.getFeatures(`get-feature?cnt_id=${this.surveyData.cnt_id}`)


    this.surveyForm.get('general')?.get('no_of_concepts')?.valueChanges.subscribe((res: any) => {
      if (res) {
        this.setsCalculation(this.allConcept.value, this.conceptSets.value, this.setsRepetition.value);
      }
    });
    this.surveyForm.get('general')?.get('concept_per_set')?.valueChanges.subscribe((res: any) => {
      if (res) {
        this.setsCalculation(this.allConcept.value, this.conceptSets.value, this.setsRepetition.value);
      }
    });
    this.surveyForm.get('general')?.get('no_of_repeatition')?.valueChanges.subscribe((res: any) => {
      if (res) {
        this.setsCalculation(this.allConcept.value, this.conceptSets.value, this.setsRepetition.value);
      }
    });
  }
  createForm() {
    this.surveyForm = this._fb.group({
      general: this._fb.group({
        title: this._fb.control('', Validators.required),
        description: this._fb.control('', Validators.required),
        no_of_concepts: this._fb.control(2, Validators.compose([Validators.required, Validators.min(2), Validators.max(100)])),
        concept_per_set: this._fb.control(2, Validators.compose([Validators.required, Validators.min(2), Validators.max(10)])),
        no_of_repeatition: this._fb.control(1, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])),
        no_of_sets: this._fb.control(1, Validators.compose([Validators.required, Validators.min(1)])),
        positive_tag: this._fb.control(null),
        negative_tag: this._fb.control(null)
      }),
      addNewConcept: this._fb.group({
        label: this._fb.control('', Validators.required),
        file: this._fb.control('', Validators.required)
      }),
      concept: this._fb.array([]),
      editConcept:this._fb.group({
        label:[''],
        url:[''],
      }),
      features: this._fb.group({
        pre: this._fb.control(0, Validators.required),
        maxdiff: this._fb.control(0, Validators.required),
        post: this._fb.control(0, Validators.required)
      })
    })
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
  handleInputChange(e: any,type:'upload'|'edit') {
    let file = e.target.files[0];
    // this.imageData = file;
    type == 'upload' ? this.surveyForm.get('addNewConcept.file').setValue(file) : this.surveyForm.get('editConcept.url').setValue(file);
    const el = document.getElementById('logo-upload') as HTMLImageElement;
    if (el && file) {
      const url = (URL.createObjectURL(file));
      console.log(url);
      if (url) {
        // this.surveyForm.get('addNewConcept.file').setValue(url);
        type == 'upload' ? this.imageUrl = url : this.editImageUrl = url;
      }
    }else{
    }
    // const el = document.getElementById('file');
    // if(el && file){
    //   el.innerHTML = file.name;
    // }
  }

  // get concept(): FormArray {
  //   return this.surveyForm.get('concept') as FormArray
  // }

  updateConcept(index:number){
    const params = this.surveyForm.get('editConcept').value;
    console.log(params);
    this.editImageUrl != '' ? params.file = params.url : delete params.file;
    const formData = new FormData();
    // !params.url.match('https') ? formData.append('file', params.url) : '';
    formData.append('label', params.label);
    params.file ? formData.append('file', params.file) : '';
    formData.append('flags', '');
    formData.append('SPSS', '')
    formData.append('id', this.concepts[index].id);
    formData.append('md_id', String(this.md_id));
    this._api.postApi('api/maxdiff-concepts', formData).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        this.concepts[index].edit = false;
        const addForm = this.surveyForm.get('editConcept') as FormGroup;
        addForm.reset();
        this.editImageUrl = '';
        this.getConcepts();
      } else {
        console.log(res);
      }
    })
  }

  get allConcept(): FormControl {
    return this.surveyForm.get('general.no_of_concepts') as FormControl
  }
  get conceptSets(): FormControl {
    return this.surveyForm.get('general.concept_per_set') as FormControl
  }
  get setsRepetition(): FormControl {
    return this.surveyForm.get('general.no_of_repeatition') as FormControl
  }

  deleteConcept(params:any) {
    this._api.deleteApi(`api/delete-concepts?id=${params}`).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        this.getConcepts();
      } else {
        console.log(res);
      }
    })
  }

  editConcept(index: number , type:'edit'|'cancel') {
    // const control = this.concept.at(index) as FormGroup;
    // control.patchValue({ edit: true });
    if(type == 'edit'){
      this.concepts[index].edit = true;
        this.surveyForm.get('editConcept').patchValue(this.concepts[index])
    }else{
      this.concepts[index].edit = false;
    }
  }



  setsCalculation(totalConcept: number, conceptSet: number, setRepetiion: number) {
    this.availableConcept = totalConcept * setRepetiion;
    const result = this.availableConcept / conceptSet;
    if (result) {
      this.surveyForm.get('general.no_of_sets').setValue(Math.ceil(result));
    }
  }

  submitGeneral() {
    console.log(this.surveyForm.get('general').value);
    const params = this.surveyForm.get('general').value;
    this._api.postApi('api/maxdiff', params).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        if (res.id) {
          this.md_id = res.id;
        }
      } else {
        console.log(res);
      }
    })
  }

  submitConcept() {
    const params = this.surveyForm.get('addNewConcept').value;
    console.log(params);
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('label', params.label);
    formData.append('flags', '');
    formData.append('SPSS', '')
    formData.append('id', '');
    formData.append('md_id', String(this.md_id));
    this._api.postApi('api/maxdiff-concepts', formData).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        this.imageUrl = '';
        const addForm = this.surveyForm.get('addNewConcept') as FormGroup;
        addForm.reset();
        this.getConcepts();
      } else {
        console.log(res);
      }
    })
  }



  submit() {
    this.selectTab(1);
  }

  getFeatures(endpoint:string){
    this._api.getApi(`api/${endpoint}`).subscribe((res: any) => {
     if(res && !res.error){
       console.log(res);
       this.surveyForm.get('features').patchValue(res.response);
     } 
  })
}
submitFeatures(){
    const params = this.surveyForm.get('features').value;
    this._api.postApi('api/feature?cnt_id='+this.surveyData.cnt_id, params).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        this.selectTab(2);
      } else {
        console.log(res);
      }
    })
}

  getConcepts() {
    this._api.getApi(`api/get-concepts?md_id=${this.md_id}`).subscribe((res: any) => {
      console.log(res);
      if (!res.error) {
        this.concepts = res.response;
        this.concept_uploaded = this.concepts.length
        this.concepts = this.concepts.map((concept: any) => {
          concept['edit'] = false;
          return concept;
        })
      }
      console.log(this.concepts);
    })
  }

  SubmitSurvey(){
    this._api.postApi('api/generate-sets?md_id='+this.md_id,{}).subscribe((res: any) => {
      if (res && !res.error) {
        console.log(res);
        this.router.navigate(['/']);
      } else {
        console.log(res);
      }
  })
}
}
