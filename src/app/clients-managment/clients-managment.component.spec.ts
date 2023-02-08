import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsManagmentComponent } from './clients-managment.component';

describe('ClientsManagmentComponent', () => {
  let component: ClientsManagmentComponent;
  let fixture: ComponentFixture<ClientsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
