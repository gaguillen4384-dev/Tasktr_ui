import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from '../services/loader.service';
import { Stats } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  stats$!: Observable<Stats>;
  stats!: Stats;

  constructor(private loader: LoaderService) {}

  async ngOnInit() {
    this.loader.getComplexProjects();
    this.stats$ = this.loader.getStatsForAllProjects();
    this.stats$.subscribe(
      storyData => {
        this.stats = storyData
      }
    );
  }



}
