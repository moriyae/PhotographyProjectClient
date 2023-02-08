import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryEzorIshiComponent } from './galery-ezor-ishi.component';

describe('GaleryEzorIshiComponent', () => {
  let component: GaleryEzorIshiComponent;
  let fixture: ComponentFixture<GaleryEzorIshiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleryEzorIshiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryEzorIshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
