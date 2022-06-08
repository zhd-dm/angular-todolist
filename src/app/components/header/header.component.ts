import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  res: any = false;

  constructor(
    private logger: AuthService
  ){}

  ngOnInit(): void {

  }

  isAuth() {
    // console.log(this.logger.checkAuth())
    return this.res = this.logger.checkAuth();

  }

  exit() {
    return this.logger.exitUser();
  }

}
