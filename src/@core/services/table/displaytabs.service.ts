import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplaytabsService {

  private tabsName = new BehaviorSubject<string>(null);
  private isShow = new BehaviorSubject<boolean>(false);

  constructor() { }

  // set-get tên hiển thị trên component Header
  getTabsName() {
    return this.tabsName.asObservable();
  }
  setTabsName(tabName) {
    this.tabsName.next(tabName);
  }

  // set -> width > 992px tat header & footer
  setToDisplay(state: boolean) {
    this.isShow.next(state);
  }

  getToDisplay() {
    return this.isShow.asObservable();
  }
}
