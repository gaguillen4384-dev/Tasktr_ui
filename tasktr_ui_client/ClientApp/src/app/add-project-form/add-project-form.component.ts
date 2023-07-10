import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html'
})
export class AddProjectFormComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private loader: LoaderService, private location: Location) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.loader.addNewProject(this.projectForm.value.projectName, this.projectForm.value.projectAcronym)
    this.location.back();
  }

  private initForm() {
    //GETTO: Validator to make sure projectacronym isnt taken.
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      //GETTO: Limit this mans right here.
      'projectAcronym': new FormControl(null, Validators.required)
    });
  }

}
