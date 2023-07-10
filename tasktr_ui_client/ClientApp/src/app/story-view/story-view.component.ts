import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

import { LoaderService } from '../services/loader.service';
import { Story } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html'
})
export class StoryViewComponent implements OnInit {
  projectAcronym: string | null;
  storyName: string | null;
  Story$!: Observable<Story>;

  constructor(private loader: LoaderService, private route: ActivatedRoute) {
    this.projectAcronym = this.route.snapshot.paramMap.get('projectacronym');
    this.storyName = this.route.snapshot.paramMap.get('storyname');
  }

  ngOnInit(): void {
    this.Story$ = this.loader.getSpecificStoryForProject(this.projectAcronym, this.storyName);
  }

}
