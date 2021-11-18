import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Script } from '../../models/script';
import { ScriptService } from '../../services/script.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;

  scripts: Observable<Script[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private scriptService: ScriptService,
    private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

      this.scripts = this .scriptService.scripts;
      this.scriptService.loadAll();

      this.scripts.subscribe(data => {
        console.log(data);
        if (data.length > 0) this.router.navigate(['/contactmanager', data[0].id]);
      })
  }

}
