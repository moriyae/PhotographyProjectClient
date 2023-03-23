import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagmentComponent } from './categories-managment.component';

describe('CategoriesManagmentComponent', () => {
  let component: CategoriesManagmentComponent;
  let fixture: ComponentFixture<CategoriesManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
