import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerbranchincomeComponent } from './managerbranchincome.component';

describe('ManagerbranchincomeComponent', () => {
  let component: ManagerbranchincomeComponent;
  let fixture: ComponentFixture<ManagerbranchincomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerbranchincomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerbranchincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
