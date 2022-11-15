import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  username?:string;
  constructor(private userService: UserService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    let isLoggedIn = !!this.tokenStorageService.getToken();

    if (isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.userName;
    }
    this.content = this.username?'Welcome '+ this.username:'Welcome !!!';
       
  }
  
}