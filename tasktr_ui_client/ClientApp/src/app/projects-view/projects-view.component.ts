import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from '../interfaces/project-specific-interface';


@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
})

export class ProjectsViewComponent {
  public projects: Project[] = [];

  //GETTO: This gets to call the loadersvc
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Project[]>(baseUrl + 'project').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
  }
}
