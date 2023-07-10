import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  async ngOnInit() {
    this.loader.getComplexProjects();
  }
}
