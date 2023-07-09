import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FullProject, Project, Story } from '../interfaces/project-specific-interface';

@Injectable({
  providedIn: 'root',
})

export class LoaderService {
  public projects: FullProject[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    http.get<FullProject[]>(baseUrl + 'project/all').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
  }

}

export const simpleProjects = new Observable((observer) => {
  var result: Project[] = [];
  this.projects.forEach(function (fullProject) {
    result.push(fullProject.project);
  }) //GETTO: this needs to be subscribed too.
})
