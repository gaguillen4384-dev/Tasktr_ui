import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LandingComponent } from './landing/landing.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { StoryViewComponent } from './story-view/story-view.component';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LandingComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectsViewComponent,
    ProjectViewComponent,
    StoryViewComponent,
    AddProjectFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'projects-view', component: ProjectsViewComponent },
      { path: 'add-project', component: AddProjectFormComponent },
      { path: 'project-view/:acronym', component: ProjectViewComponent },
      { path: 'story-view/:projectacronym/:storyname', component: StoryViewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
