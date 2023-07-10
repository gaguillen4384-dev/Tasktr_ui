import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, shareReplay, delay } from 'rxjs/operators';

import { FullProject, Project, Story } from '../interfaces/project-specific-interface';

@Injectable({
  providedIn: 'root',
})

export class LoaderService {
  projects$!: Observable<FullProject[]>;
  private projects!: FullProject[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.projects$ = this.http.get<FullProject[]>(this.baseUrl + 'project/all').pipe(
      shareReplay()
    );

    this.projects$.subscribe(
      projectData => {
        this.projects = projectData;
      }
    );
  }

  getComplexProjects(): Observable<FullProject[]> {
    return this.projects$;
  }

  getSimpleProjects(): Observable<Project[]> {
    let simpleProject: Project[] = [];

    this.projects.forEach(
      singleElement => {
        simpleProject.push(singleElement.project)
      }
    );
    const result = of(simpleProject);
    return result;
  }

  getSpecificProjectStories(projectAcronym: string| null): Observable<Story[]> {
    let storiesList: Story[] = [];

    let project = this.projects.find(
      (singleElement) => {
        return singleElement.id === projectAcronym
      }, 
    );

    if (project) {
      storiesList = project.stories;
    }

    const result = of(storiesList);
    return result;
  }

  getSpecificStoryForProject(projectAcronym: string | null, storyName: string | null): Observable<Story> {
    let story = {} as Story;
    let project = this.projects.find(
      (singleElement) => {
        return singleElement.id === projectAcronym
      },
    );

    if (project) {
      let potential = project.stories.find(
        (singleElement) => {
          return singleElement.name === storyName
        },
      );

      if (potential) {
        story = potential; 
      }
    }

    const result = of(story);
    return result;
  }


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
