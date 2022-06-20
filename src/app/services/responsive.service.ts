import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private responsive: BreakpointObserver) { }

  isPhone() {
    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        if(result.matches) {
          return true;
        }
        return false;
      });
  }
}
