import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from '../services/loader.service';
import { FullProject, ProjectStats } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

  constructor(private loader: LoaderService) {}

  async ngOnInit() {
    this.loader.getComplexProjects();
  }


}
