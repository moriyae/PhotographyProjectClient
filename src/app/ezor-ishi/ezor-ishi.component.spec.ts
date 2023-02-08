import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzorIshiComponent } from './ezor-ishi.component';

describe('EzorIshiComponent', () => {
  let component: EzorIshiComponent;
  let fixture: ComponentFixture<EzorIshiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzorIshiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzorIshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
