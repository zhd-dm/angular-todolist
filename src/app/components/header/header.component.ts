import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  res: Boolean = <Boolean>this.logger.checkAuth();

  constructor(
    private logger: AuthService
  ){}

  ngOnInit(): void {

  }

  isAuth() {

    console.log(this.res)
    return this.res;

  }

  exit() {
    return this.logger.exitUser();
  }

}
