import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../services/loader.service';
import { Project } from '../interfaces/project-specific-interface';


@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
})

export class ProjectsViewComponent implements OnInit {
  public projects: Project[] = [];

  constructor(private loader: LoaderService) { }

  async ngOnInit() {
    const response = this.loader.getProjects();
    this.projects = await response;
  }
}
