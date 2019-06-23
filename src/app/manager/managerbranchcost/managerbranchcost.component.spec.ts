import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerbranchcostComponent } from './managerbranchcost.component';

describe('ManagerbranchcostComponent', () => {
  let component: ManagerbranchcostComponent;
  let fixture: ComponentFixture<ManagerbranchcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerbranchcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerbranchcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
