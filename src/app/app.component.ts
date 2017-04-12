import { UserService } from './shared/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/user';

@Component({
  selector: 'aap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ROOMS';
  user: User;
  
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);
  }

  login() {
    console.log("login button pressed");
    this.userService.login();
  }

  logout() {
    console.log("logout button pressed");
    this.userService.logout();

  }
}
