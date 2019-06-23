import { Component, OnInit } from '@angular/core';
import { DisplaytabsService } from 'src/@core/services/table/displaytabs.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-order-prepare',
    templateUrl: './order-prepare.component.html',
    styleUrls: ['./order-prepare.component.scss']
})
export class OrderPrepareComponent implements OnInit {
    constructor(private title: Title, private tabsNameService: DisplaytabsService) {
        this.title.setTitle('Order-Prepare');
        this.tabsNameService.setTabsName('Orders');
    }

    ngOnInit() { }
}
