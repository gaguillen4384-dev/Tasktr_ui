import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
})
export class ProjectViewComponent implements OnInit {
  projectAcronym: string | null;
  constructor(private route: ActivatedRoute) {
    this.projectAcronym = '';
  }

  ngOnInit(): void {
    //GETTO: if this thing is null there's problems in paradise
    this.projectAcronym = this.route.snapshot.paramMap.get('acronym')
  }

}
