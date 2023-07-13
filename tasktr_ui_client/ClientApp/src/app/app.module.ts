import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { StoryViewComponent } from './story-view/story-view.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { AddStoryFormComponent } from './add-story-form/add-story-form.component';
import { ProjectsStatsComponent } from './projects-stats/projects-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LandingComponent,
    ProjectsViewComponent,
    ProjectViewComponent,
    StoryViewComponent,
    AddProjectFormComponent,
    AddStoryFormComponent,
    ProjectsStatsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent, pathMatch: 'full' },
      { path: 'projects-view', component: ProjectsViewComponent },
      { path: 'add-project', component: AddProjectFormComponent },
      { path: 'add-story/:projectacronym', component: AddStoryFormComponent },
      { path: 'project-view/:acronym', component: ProjectViewComponent },
      { path: 'story-view/:projectacronym/:storyname', component: StoryViewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
