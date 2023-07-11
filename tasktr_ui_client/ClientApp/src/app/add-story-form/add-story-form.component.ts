import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';

import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-add-story-form',
  templateUrl: './add-story-form.component.html'
})
export class AddStoryFormComponent implements OnInit {
  projectAcronym!: string | null;
  storyForm!: FormGroup;

  constructor(private loader: LoaderService, private location: Location, private route: ActivatedRoute) {
    this.projectAcronym = this.route.snapshot.paramMap.get('projectacronym');
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.loader.addNewStoryToProject(this.projectAcronym, this.storyForm.value.storyName,
      this.storyForm.value.storyName, this.storyForm.value.storySubtasks)
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  get storySubtasks(): FormArray {
    return this.storyForm.get("storySubtasks") as FormArray
  }

  addSubtask() {
    this.storySubtasks.push(new FormControl(null, Validators.required));
  }

  removeSubtask(index: number) {
    this.storySubtasks.removeAt(index);
  }


  private initForm() {
    //GETTO: Validator to make sure projectacronym isnt taken.
    this.storyForm = new FormGroup({
      storyName: new FormControl(null, Validators.required),
      storyTask: new FormControl(null, Validators.required),
      storySubtasks: new FormArray([])
    });
  }
}
