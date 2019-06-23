import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  tabs = ['TABLE', 'MENU', 'ORDERS', 'MANAGEMENT'];
  // tslint:disable-next-line:no-inferrable-types
  isFooter: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  isHeader: boolean = true;
  isManager = true;
  constructor(
    private activated: ActivatedRoute,
    private tabsName: DisplaytabsService,
    private title:Title,
  ) { }

  ngOnInit() {
    // Bật/Tắt footer theo component
    this.activated.params.subscribe(_ => {
      this.tabsName.getTabsName().subscribe(tab => {
        if (tab || tab === '') {
          setTimeout(() => {
            this.isFooter = this.tabs.some(x => x === tab.toUpperCase());
            if(this.title.getTitle().toUpperCase()==="MANAGEMENT")
          {
            this.isFooter=true;
          }
          }, 0);
        }
      });
      // nếu width Order-List > 992px display Header
      this.tabsName.getToDisplay().subscribe(state => {
        this.isHeader = !state;
        this.tabsName.getTabsName().subscribe(tabs => {
          if (tabs === 'ORDER LIST') {
            this.isFooter = false;
          } else if (tabs === 'TABLE') {
            this.isFooter = !state;
          }
        });
      });
    });
  }
}
