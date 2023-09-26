import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClientComponent } from './AddNewClientComponent';

describe('AddNewClientComponent', () => {
  let component: AddNewClientComponent;
  let fixture: ComponentFixture<AddNewClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
