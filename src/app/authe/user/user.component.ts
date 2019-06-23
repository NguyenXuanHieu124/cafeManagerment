import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { elementEventFullName } from '@angular/core/src/view';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '115px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ]),
  ],
})
export class UserComponent implements OnInit {
  public isEdit:boolean = false;
  public isPW: boolean = false;
  public username: string = "cuong1804";
  public email: string = "nongkimcuong.it@gmail.com";
  public fullname: string = "Nông Kim Cương";
  public getfullname: string = this.fullname;
  public age: number = 1997;
  public getage: number = this.age;
  public isGender: boolean = true;
  public getGender: boolean = this.isGender;
  public address: string = "Quận 9, TPHCM";
  public getaddress: string = this.address;
  public phonenumber: string = "0911888977";
  public getphonenumber: string = this.phonenumber;
  public oldpw: string;
  public getoldpw: string;
  public newpw: string;
  public confirm: string;

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit() { }
  onClickEdit(){
    this.isEdit = true;
  }
  onClickSaveInfor(){
    this.isEdit = false;
    this.fullname = this.getfullname;
    this.age = this.getage;
    this.isGender = this.getGender;
    this.address = this.getaddress;
    this.phonenumber = this.getphonenumber;
    this.toastr.success('Sửa thông tin thành công');
  }
  onClickSavePW(){
    this.isPW = false;
    this.toastr.success('Đổi mật khẩu thành công');
    this.oldpw = this.getoldpw;
    this.getoldpw = "";
    this.newpw = "";
    this.confirm = "";
  }

  onClickCancel(){
    this.isEdit = false;
    this.isPW = false;
    this.getfullname = this.fullname;
    this.getage = this.age;
    this.getGender = this.isGender;
    this.getaddress = this.address;
    this.getphonenumber = this.phonenumber;
    this.getoldpw = "";
    this.newpw = "";
    this.confirm = "";
  }
  ManGender(){
    this.getGender = true;
  }
  WomenGender(){
    this.getGender = false;
  }
  onClickPW()
  {
    this.isPW = true;
  }
  onClickExit()
  {
    this.router.navigate(['table']);
  }
}
