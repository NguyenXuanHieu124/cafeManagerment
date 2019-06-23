import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lauch-screen',
  templateUrl: './lauch-screen.component.html',
  styleUrls: ['./lauch-screen.component.scss']
})
export class LauchScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['on-boarding']);
    }, 3000);
  }

}
