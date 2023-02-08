import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsManagmentComponent } from './events-managment.component';

describe('EventsManagmentComponent', () => {
  let component: EventsManagmentComponent;
  let fixture: ComponentFixture<EventsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
