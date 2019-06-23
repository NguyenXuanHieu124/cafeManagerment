import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { JwtService } from 'src/@core/services/jwt.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { User } from 'src/@core/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/@core/services/user.service';
import { RolesService } from 'src/@core/services/manager/roles.service' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private router: Router,
    private loginService: LoginService,
    private jwtService: JwtService,
    private authService: AuthService,
    private toastr: ToastrService,
    private userService: UserService,
    private rolesManager: RolesService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.titleService.setTitle('Highlands Coffee - Login');
    if (localStorage.getItem('jwt')) {
      this.authService.onLogin().subscribe((isLogin) => {
        this.rolesManager.isManager(localStorage.getItem('username'))
      .subscribe(isAdmin=>{this.authService.isManager=isAdmin;console.log("lay jwt tai logints"+this.authService.isManager);

        if (isLogin) {
          if(this.authService.isManager){
            this.router.navigate(['manager'])
          }else
          this.router.navigate(['table']);
        }});
      });
    }
  }

  login(username, password) {
    const user: User = {
      UserName: username,
      Password: password,
      Grant_Type: "password",
    };
    this.loginService.login(user).subscribe(token => {
      this.jwtService.setToken(token.access_token);
      this.jwtService.setUserName(token.userName);
      this.rolesManager.isManager(token.userName)
      .subscribe(isAdmin=>{this.authService.isManager=isAdmin;console.log(this.authService.isManager+token.userName)
      this.authService.onLogin().subscribe((isLogin) => {
        if (isLogin) {
          if(this.authService.isManager)
          {
            this.router.navigate(['manager'])
          }else
          {
            this.router.navigate(['table']);
          }
        }
      });});
      this.toastr.success('Đăng nhập thành công');
    }, (err) => {
      console.log(err);
      this.toastr.error('Tài khoản hoặc mật khẩu không đúng! Vui lòng nhập lại!');
    });

  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['ngtrdai197', [
        // Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(50),
      ]],

      password: ['Anhdaii1', [
        // Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(50),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]],
    });
  }
}
