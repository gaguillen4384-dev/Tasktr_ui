import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';

import { LoaderService } from '../services/loader.service';
import { Story, Project, ProjectStats } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
})
export class ProjectViewComponent implements OnInit {
  projectAcronym: string | null;
  projectStories$!: Observable<Story[]>;
  projectStories!: Story[];
  projectStats$!: Observable<ProjectStats>;
  projectStats!: ProjectStats;
  percentageOfCompletion$!: BehaviorSubject<string>;

  constructor(private loader: LoaderService, private route: ActivatedRoute, private location: Location) {
    //GETTO: if this thing is null there's problems in paradise
    this.projectAcronym = this.route.snapshot.paramMap.get('acronym');

  }

  ngOnInit(): void {
    this.projectStories$ = this.loader.getSpecificProjectStories(this.projectAcronym);
    this.projectStories$.subscribe(
      projectData => {
        this.projectStories = projectData
      }
    );

    this.projectStats$ = this.loader.getStatsForProject(this.projectAcronym);
    this.projectStats$.subscribe(
      projectData => {
        this.projectStats = projectData;
      }
    )
  }

  storyCompletePercentage(story: Story) {
    this.percentageOfCompletion$.next(((story.storyStats.numberOfCompletedTasks / story.storyStats.numberOfTasks) / 100) + '%');
  }

  goBack() {
    this.location.back();
  }
}
