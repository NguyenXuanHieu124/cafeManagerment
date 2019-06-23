import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/@core/services/jwt.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
  title = 'HighlandCoffe';
  constructor(
    private autheService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) { }
  ngOnInit() {
    const access_token = this.jwtService.getToken();
    if (access_token) {
      this.autheService.isLogin = true;
    } else {
      // this.router.navigate(['auth']);
    }
  }
}
