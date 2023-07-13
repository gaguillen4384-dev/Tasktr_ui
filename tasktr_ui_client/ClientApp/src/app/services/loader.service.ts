import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { FullProject, Project, Story, TaskCheck, ProjectStats, StoryStats, Stats } from '../interfaces/project-specific-interface';

@Injectable({
  providedIn: 'root',
})

export class LoaderService {
  private projects!: FullProject[];
  private _projects$ = new BehaviorSubject<FullProject[]>(this.projects);
  private projects$ = this._projects$.asObservable();


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<FullProject[]>(this.baseUrl + 'project/all').pipe(
      shareReplay(),
      catchError(this.handleError)
      )
      .subscribe(
        val => {
          this._projects$.next(val);
        }
    )
    this.projects$.subscribe(
      x => {
        this.projects = x;
      }
    )

  }

  getComplexProjects(): Observable<FullProject[]> {
    this.getProjectsLocally();
    return this._projects$.asObservable();
  }

  getSimpleProjects(): Observable<Project[]> {
    this.getProjectsLocally();
    let simpleProject: Project[] = [];

    this.projects.forEach(
      singleElement => {
        simpleProject.push(singleElement.project);
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

  getStatsForProject(projectAcronym: string | null): Observable<ProjectStats> {
    let localStats = {} as ProjectStats;
    let fullProject = this.projects.find(
      (singleElement) => {
        return singleElement.id === projectAcronym
      },
    );

    if (fullProject) {
      localStats = fullProject.project.projectStats;
      localStats.numberOfTotalStories = (
        localStats.numberOfActiveStories +
        localStats.numberOfCompletedStories
      )
    }
    const result = of(localStats);
    return result;
  }

  getStatsForStory(projectAcronym: string | null, storyName: string | null): Observable<StoryStats> {
    var localStats = <StoryStats>{};
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
        localStats = potential.storyStats;
      }
    }

    const result = of(localStats);
    return result;
  }

  getStatsForAllProjects(): Observable<Stats> {
    let localStats: Stats = {
      numberOfTotalProjects: 0,
      numberOfTotalStories: 0,
      numberOfActiveStories: 0
    };

    for (let localProject of this.projects) {
      localStats.numberOfActiveStories += localProject.project.projectStats.numberOfActiveStories;
      console.log(localProject.project.projectStats.numberOfActiveStories);
      localStats.numberOfTotalStories +=
        (localProject.project.projectStats.numberOfActiveStories +
          localProject.project.projectStats.numberOfCompletedStories);
      localStats.numberOfTotalProjects += 1;
    }
    
    const result = of(localStats);
    return result;
  }


  addNewProject(projectName: string, projectAcronym: string) {
    let newProjectStats: ProjectStats = {
      numberOfTotalStories: 0,
      numberOfActiveStories: 0,
      numberOfCompletedStories: 0
    }

    let newProject: Project = {
      acronym: projectAcronym,
      name: projectName,
      projectStats: newProjectStats
    }

    let newFullProject: FullProject = {
      id: projectAcronym,
      project: newProject,
      stories: []
    }
    
    this.projects.push(newFullProject);
    this.locallyPersistProjects();
  }

  addNewStoryToProject(projectAcronym: string| null, storyName: string, task: string, subtasks: string[])
  {
    let fullProject = this.projects.find(
      (singleElement) => {
        return singleElement.id === projectAcronym
      },
    );

    let localStats: StoryStats = {
      numberOfCompletedTasks: 0,
      numberOfTasks: 1
    }

    if (fullProject) {

      let localSubtasks: TaskCheck[] = [];

      if (subtasks.length != 0) {
        for (var subtask in subtasks) {
          localSubtasks.push(this.convertToTaskCheck(subtask));
          localStats.numberOfTasks += 1;
        }
      }

      let newStory: Story = {
        projectAcronym: fullProject.project.acronym,
        name: storyName,
        task: this.convertToTaskCheck(task),
        subtasks: localSubtasks,
        completed: false,
        storyStats: localStats
      }
      fullProject.project.projectStats.numberOfActiveStories += 1;
      fullProject.stories.push(newStory);
      this.locallyPersistProjects();
    }
  }

  updateStoryInProject(story: Story) {
    let fullProject = this.projects.find(
      (singleElement) => {
        return singleElement.id === story.projectAcronym
      },
    );

    if (fullProject) {
      let potential = fullProject.stories.find(
        (singleElement) => {
          return singleElement.name === story.name
        },
      );

      if (potential) {
        if (story.completed) {
          fullProject.stories = fullProject.stories.filter(
            storyData => {
              return storyData !== potential;
            }
          );
          fullProject.project.projectStats.numberOfCompletedStories += 1;
          this.locallyPersistProjects();
          return;
        }

        potential.storyStats.numberOfCompletedTasks = story.storyStats.numberOfCompletedTasks;
        this.locallyPersistProjects();
      }
    } 
  }

  locallyPersistProjects() {
    localStorage.setItem("tktr_projects", JSON.stringify(this.projects));
  }

  getProjectsLocally() {
    let jsonObj: FullProject[] = [];
    var item = localStorage.getItem('tktr_projects');
    if (item) {
      jsonObj = JSON.parse(item);
      this._projects$.next(jsonObj);
    }
  }

  private convertToTaskCheck(action: string): TaskCheck {
    let taskCheck: TaskCheck = {
      taskAction: action,
      completed: false
    }

    return taskCheck;
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
