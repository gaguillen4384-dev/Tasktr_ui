import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Story } from '../interfaces/project-specific-interface';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
})
export class ProjectViewComponent implements OnInit {
  projectAcronym: string | null;
  //projectStories: Story[];
  constructor(private route: ActivatedRoute) {
    //GETTO: if this thing is null there's problems in paradise
    this.projectAcronym = this.route.snapshot.paramMap.get('acronym');



  }

  ngOnInit(): void {
  }

}
