import { Component, OnInit ,Input} from '@angular/core';
import {Income} from 'src/@core/interfaces/income.interface';


@Component({
  selector: 'app-managerbranchincome',
  templateUrl: './managerbranchincome.component.html',
  styleUrls: ['./managerbranchincome.component.scss']
})

export class ManagerbranchincomeComponent implements OnInit {

  @Input() income : Income;

  constructor() { 
  }

  ngOnInit() {
    console.log(this.income);
  }
}
