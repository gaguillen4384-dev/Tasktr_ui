import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

import { LoaderService } from '../services/loader.service';
import { Story } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
})
export class ProjectViewComponent implements OnInit {
  projectAcronym: string | null;
  projectStories$!: Observable<Story[]>;

  constructor(private loader: LoaderService,private route: ActivatedRoute) {
    //GETTO: if this thing is null there's problems in paradise
    this.projectAcronym = this.route.snapshot.paramMap.get('acronym');

  }

  ngOnInit(): void {
    this.projectStories$ = this.loader.getSpecificProjectStories(this.projectAcronym);
  }

}
