import { Component, OnInit ,Input, ViewChild, OnDestroy} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Income } from 'src/@core/interfaces/income.interface';
import { IncomeService } from 'src/@core/services/manager/income.service';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { BsDatepickerConfig, BsDatepickerViewMode, DayPickerComponent, DatePickerComponent, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import { forEach } from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/@core/services/jwt.service'
import {DatepickerService1} from 'src/@core/services/manager/datepicker.service'
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit,OnDestroy {
  @ViewChild("dpp") lich: BsDatepickerDirective;
  //this.lich = new Observable<BsDatepickerDirective>();
  
  incomes: Income[];
  TongChi:number = 0;
  ToTal:number = 0;
  theodoi:any;
  lich1:BsDatepickerDirective;
  loi:string;
  private sub: Subscription;
  //bsDatepicker : any;

  bsValue: Date = new Date(2017, 7);
  minMode: BsDatepickerViewMode = 'month';
  Thang :number =11;
  Nam:number = 2018;
  ngay:number;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    //private costService: CostService,
    private incomeService: IncomeService,
    private titleService: Title,
    private tabNameService: DisplaytabsService,
    private datesvice : DatepickerService1,
    private jtoken : JwtService,
  ) { this.tabNameService.setTabsName("THÁNG "+this.Thang);

}

  ngOnInit() {
    
    this.titleService.setTitle("MANAGEMENT");
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,containerClass:'theme-orange'
    });
    console.log(this.jtoken.getUserName());
    this.sub = this.datesvice.getdatePicker().subscribe(data=>{
      console.log("get data from Header ");
      if(data!=null) this.bsValue=new Date(data);
      console.log("du lieu moi nhan : "+ data.toString());
      this.ToTal=0;this.Thang=this.bsValue.getMonth()+1 ;this.Nam=this.bsValue.getFullYear() ;
      this.getIncomeByMonth(this.Thang,this.Nam);
      this.tabNameService.setTabsName("THÁNG "+this.Thang);
    })
    //this.lich.onHidden.subscribe(data=> {this.chon(this.bsValue);this.ToTal=0;this.Thang=this.bsValue.getMonth()+1 ;this.Nam=this.bsValue.getFullYear() ;this.getIncomeByMonth(this.Thang,this.Nam)});
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  /*getCostLastMonth(){
    this.costService.getCostLastMonth().subscribe((costs:Cost[])=>{
      this.costs = costs;
      console.log(this.costs);
      costs.forEach(element => {
        this.TongChi += element.cost;
        this.bsValue.getMonth();
      });
    })
  }*/

  getIncomeByMonth(thang,nam){
    this.resetIncomes();
    this.incomeService.getIncomeByMonth(thang,nam).subscribe((incomes:Income[])=>{
      this.incomes = incomes;
      this.incomes.forEach(element => {
        this.ToTal += element.income;

    })
    })
  }

  resetIncomes(){
    this.incomes = null;
  }
}
