import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';


import { LoaderService } from '../services/loader.service';
import { Story, TaskCheck } from '../interfaces/project-specific-interface';

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
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
