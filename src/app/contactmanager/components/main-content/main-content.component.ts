import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Script } from '../../models/script';
import { ScriptService } from '../../services/script.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainContentComponent implements OnInit {

  script: Script;
  constructor(
    private route: ActivatedRoute, 
    private service: ScriptService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.service.scripts.subscribe(scripts => {
        this.script = this.service.scriptById(id);
      })
    })
  }
}


