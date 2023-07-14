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
  currentIndex: number = 1;
  subtask1: boolean = true;
  subtask2: boolean = false;
  subtask3: boolean = false;
  subtask4: boolean = false;



  constructor(private loader: LoaderService, private location: Location, private route: ActivatedRoute) {
    this.projectAcronym = this.route.snapshot.paramMap.get('projectacronym');
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {

    this.loader.addNewStoryToProject(this.projectAcronym, this.storyForm.value.storyName,
      this.storyForm.value.storyName, this.storyForm.value.storySubTask1, this.storyForm.value.storySubTask2,
      this.storyForm.value.storySubTask3, this.storyForm.value.storySubTask4);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  addSubtask(numberOfSubTask: number) {
    switch (numberOfSubTask) {
      case 1: {
        this.currentIndex += 1;
        this.subtask2 = true;
        break;
      }
      case 2: {
        this.currentIndex += 1;
        this.subtask3 = true;
        break;
      }
      case 3: {
        this.currentIndex += 1;
        this.subtask4 = true;
        break;
      }
      default: {
        break;
      }
    }
    console.log(this.currentIndex);
  }

  private initForm() {
    this.storyForm = new FormGroup({
      storyName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      storyTask: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      storySubTask1:new FormControl(null, [
        Validators.minLength(3),
      ]),
      storySubTask2: new FormControl(null, [
        Validators.minLength(3),
      ]),
      storySubTask3: new FormControl(null, [
        Validators.minLength(3),
      ]),
      storySubTask4: new FormControl(null, [
        Validators.minLength(3),
      ])
    });
  }
}
