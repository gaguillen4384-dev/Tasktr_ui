import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';


import { LoaderService } from '../services/loader.service';
import { Story, TaskCheck, StoryStats } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html'
})
export class StoryViewComponent implements OnInit {
  projectAcronym: string | null;
  storyName: string | null;
  story$!: Observable<Story>;
  story!: Story;
  storySubtasks!: TaskCheck[];
  storyPercentageCompleted!: string;

  constructor(private loader: LoaderService, private route: ActivatedRoute, private location: Location) {
    this.projectAcronym = this.route.snapshot.paramMap.get('projectacronym');
    this.storyName = this.route.snapshot.paramMap.get('storyname');
  }

  ngOnInit(): void {
    this.story$ = this.loader.getSpecificStoryForProject(this.projectAcronym, this.storyName);
    this.story$.subscribe(
      storyData => {
        this.story = storyData
        this.storySubtasks = storyData.subtasks
        this.storyPercentageCompleted = (
          (storyData.storyStats.numberOfCompletedTasks / storyData.storyStats.numberOfTasks) * 100) + '%'
      }
    );
  }

  updateTaskChecks(indexOfTask: number): void {
    if (indexOfTask >= 0) {
      this.story.subtasks[indexOfTask].completed = true;
      this.story.storyStats.numberOfCompletedTasks += 1;
      this.storyPercentageCompleted = (
        (this.story.storyStats.numberOfCompletedTasks / this.story.storyStats.numberOfTasks) * 100) + '%';
      if ((this.story.storyStats.numberOfCompletedTasks / this.story.storyStats.numberOfTasks) === 1) {
        this.story.completed = true;
      }
      this.loader.updateStoryInProject(this.story);
      this.goBack();
      return;
    }

    this.story.task.completed = true;
    this.story.storyStats.numberOfCompletedTasks += 1;
    this.storyPercentageCompleted = (
      (this.story.storyStats.numberOfCompletedTasks / this.story.storyStats.numberOfTasks) * 100) + '%';
    if ((this.story.storyStats.numberOfCompletedTasks / this.story.storyStats.numberOfTasks) === 1) {
      this.story.completed = true;
      this.goBack();
    }
    this.loader.updateStoryInProject(this.story);
  }

  goBack() {
    this.location.back();
  }


}
