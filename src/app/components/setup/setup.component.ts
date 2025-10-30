import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

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
  total_concepts: any;
  concept_uploaded = 0;
  concepts: any;

  data = [
    { id: "1", name: "Modern Office Workspace", imageUrl: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMTczMTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "2", name: "Coffee Shop Interior", imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTQ2NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "3", name: "Minimalist Bedroom", imageUrl: "https://images.unsplash.com/photo-1610307522657-8c0304960189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjExMjk3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "4", name: "Modern Kitchen", imageUrl: "https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2MTIwNjc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "5", name: "Cozy Living Room", imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjExNDgwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "6", name: "Outdoor Patio", imageUrl: "https://images.unsplash.com/photo-1661024768242-5fd7c8f1e3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcGF0aW8lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzYxMjAyNzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "7", name: "Home Gym", imageUrl: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MTIwOTM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "8", name: "Reading Nook", imageUrl: "https://images.unsplash.com/photo-1623771702313-39dc4f71d275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwbm9vayUyMGJvb2tzfGVufDF8fHx8MTc2MTIzODk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "9", name: "Modern Bathroom", imageUrl: "https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjExNzU5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "10", name: "Home Office Desk", imageUrl: "https://images.unsplash.com/photo-1614598389565-8d56eddd2f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwZGVza3xlbnwxfHx8fDE3NjExNzgxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "11", name: "Dining Room", imageUrl: "https://images.unsplash.com/photo-1547062200-f195b1c77e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjByb29tJTIwdGFibGV8ZW58MXx8fHwxNzYxMjM4OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "12", name: "Kids Playroom", imageUrl: "https://images.unsplash.com/photo-1633104319071-4fa6fa12a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheXJvb20lMjB0b3lzfGVufDF8fHx8MTc2MTE1NTQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "13", name: "Garden Space", imageUrl: "https://images.unsplash.com/photo-1664023304975-58b2e587d38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBvdXRkb29yJTIwcGxhbnRzfGVufDF8fHx8MTc2MTIzODk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "14", name: "Walk-in Closet", imageUrl: "https://images.unsplash.com/photo-1708397016786-8916880649b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxrJTIwaW4lMjBjbG9zZXR8ZW58MXx8fHwxNzYxMTU0ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "15", name: "Home Theater", imageUrl: "https://images.unsplash.com/photo-1591452706295-06d0d6abc3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwdGhlYXRlciUyMHJvb218ZW58MXx8fHwxNzYxMjM4OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "16", name: "Laundry Room", imageUrl: "https://images.unsplash.com/photo-1639010357069-64a5c260589f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTIzODk1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "17", name: "Art Studio", imageUrl: "https://images.unsplash.com/photo-1759333213207-daabf2584348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMTI0MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "18", name: "Wine Cellar", imageUrl: "https://images.unsplash.com/photo-1760573851473-c554a53c9d28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwY2VsbGFyJTIwc3RvcmFnZXxlbnwxfHx8fDE3NjEyMzg5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "19", name: "Home Bar", imageUrl: "https://images.unsplash.com/photo-1704383014623-a6630096ff8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYmFyJTIwY291bnRlcnxlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "20", name: "Meditation Room", imageUrl: "https://images.unsplash.com/photo-1627257365018-07f00041b023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHplbnxlbnwxfHx8fDE3NjEyMzg5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "21", name: "Music Studio", imageUrl: "https://images.unsplash.com/photo-1522870389523-7e83c0065eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGluc3RydW1lbnRzfGVufDF8fHx8MTc2MTE0NDIxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "22", name: "Craft Room", imageUrl: "https://images.unsplash.com/photo-1760914939644-fccdb02eb8d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHJvb20lMjBzdXBwbGllc3xlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "23", name: "Home Library", imageUrl: "https://images.unsplash.com/photo-1736147936383-8eb3d7b83d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbGlicmFyeSUyMGJvb2tzaGVsZnxlbnwxfHx8fDE3NjEyMzg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "24", name: "Indoor Pool", imageUrl: "https://images.unsplash.com/photo-1731336478730-09d1f3bc5dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb29sJTIwbHV4dXJ5fGVufDF8fHx8MTc2MTIyMjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "25", name: "Sauna & Spa", imageUrl: "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVuYSUyMHNwYSUyMHJvb218ZW58MXx8fHwxNzYxMjM4OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "26", name: "Game Room", imageUrl: "https://images.unsplash.com/photo-1627257060697-acfbecf5d9a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwcm9vbSUyMGVudGVydGFpbm1lbnR8ZW58MXx8fHwxNzYxMjM4OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "27", name: "Rooftop Terrace", imageUrl: "https://images.unsplash.com/photo-1737466670202-aab34a09f3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdGVycmFjZSUyMGNpdHl8ZW58MXx8fHwxNzYxMTkzNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "28", name: "Mudroom", imageUrl: "https://images.unsplash.com/photo-1692394786787-e58d080cf23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWRyb29tJTIwZW50cnl3YXklMjBzdG9yYWdlfGVufDF8fHx8MTc2MTIzODk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "29", name: "Greenhouse", imageUrl: "https://images.unsplash.com/photo-1641816482139-c04a5fe29b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwcGxhbnRzJTIwaW5kb29yfGVufDF8fHx8MTc2MTIzODk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "30", name: "Pet Room", imageUrl: "https://images.unsplash.com/photo-1684176025371-7c61dc427350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjByb29tJTIwYW5pbWFsc3xlbnwxfHx8fDE3NjEyMzg5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
  ];


  constructor(private _fb: FormBuilder, private _api: ApiService, private route: ActivatedRoute) {
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

    console.log(this.surveyForm)


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
      features: this._fb.group({
        show_pre_survey: this._fb.control(false, Validators.required),
        show_probing: this._fb.control(false, Validators.required),
        show_post_survey: this._fb.control(false, Validators.required)
      })
    })
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }
  handleInputChange(e: any) {
    let file = e.target.files[0];
    // this.imageData = file;
    this.surveyForm.get('addNewConcept.file').setValue(file);
    const el = document.getElementById('logo-upload') as HTMLImageElement;
    if (el) {
      const url = (URL.createObjectURL(file));
      console.log(url);
      if (url) {
        // this.surveyForm.get('addNewConcept.file').setValue(url);
        this.imageUrl = url
      }
    }
    // const el = document.getElementById('file');
    // if(el && file){
    //   el.innerHTML = file.name;
    // }
  }

  // get concept(): FormArray {
  //   return this.surveyForm.get('concept') as FormArray
  // }

  get allConcept(): FormControl {
    return this.surveyForm.get('general.no_of_concepts') as FormControl
  }
  get conceptSets(): FormControl {
    return this.surveyForm.get('general.concept_per_set') as FormControl
  }
  get setsRepetition(): FormControl {
    return this.surveyForm.get('general.no_of_repeatition') as FormControl
  }

  // addConcept() {
  //   const addForm = this.surveyForm.get('addNewConcept') as FormGroup;
  //   const conceptName = addForm.get('label')?.value;
  //   const conceptImage = addForm.get('file')?.value;

  //   if (conceptName.trim() && conceptImage.trim()) {
  //     this.concept.push(
  //       this._fb.group({
  //         name: [conceptName],
  //         imageUrl: [conceptImage],
  //         edit: [false]
  //       })
  //     );

  //     addForm.reset();
  //   }
  // }



  deleteConcept(index: number) {
    // this.concept.removeAt(index);
  }



  // editCard(index: number){
  //   this.concepts[index].edit = true;
  // }

  cancel(index: number) {
    this.concepts[index].edit = false;
  }

  save(index: number) {
    console.log(index);
  }

  editConcept(index: number) {
    // const control = this.concept.at(index) as FormGroup;
    // control.patchValue({ edit: true });
    this.concepts[index].edit = true;
  }

  saveConcept(index: number) {
    // this.concept.at(index).patchValue({ edit: false });
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
        const addForm = this.surveyForm.get('addNewConcept') as FormGroup;
        addForm.reset();
        this.getConcepts();
      } else {
        console.log(res);
      }
    })
  }



  submit() {
    console.log(this.surveyForm.value);
    // const result = this.surveyForm.value;
    // if(result){
    //   localStorage.setItem('allData',JSON.stringify(result));
    // }
  }

  getConcepts() {
    this._api.getApi(`api/get-concepts?md_id=${this.md_id}`).subscribe((res: any) => {
      console.log(res);
      if (!res.error) {
        this.concepts = res.data;
        this.concept_uploaded = this.concepts.length
        this.concepts = this.concepts.map((concept: any) => {
          concept['edit'] = false;
          return concept;
        })
      }

      console.log(this.concepts);
      

    })
  }

}
