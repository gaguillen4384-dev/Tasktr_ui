import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';

import { LoaderService } from '../services/loader.service';
import { Project } from '../interfaces/project-specific-interface';


@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
})

export class ProjectsViewComponent implements OnInit {
  public projects$!: Observable<Project[]>;

  constructor(private loader: LoaderService) { }

  async ngOnInit() {
    this.projects$ = this.loader.getSimpleProjects();

    this.projects$.subscribe(
      x => {
        this.loader.locallyPersistProjects();
      }
    );
  }
}
