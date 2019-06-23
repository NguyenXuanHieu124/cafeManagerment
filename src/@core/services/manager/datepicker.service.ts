import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
@Injectable({
    providedIn: 'root'
})
export class DatepickerService1{
    private datePicker = new Subject<string>();

    constructor(){ };

    getdatePicker()
    {
        console.log("dang ki (get -> obser)");
        return this.datePicker.asObservable();
        
    }

    setdatePicker(datepicdir)
    {
        this.datePicker.next(datepicdir);
        console.log("service set date->next = "+datepicdir.toString());
    }
}
