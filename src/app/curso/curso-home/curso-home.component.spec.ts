import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoHomeComponent } from './curso-home.component';

describe('CursoHomeComponent', () => {
  let component: CursoHomeComponent;
  let fixture: ComponentFixture<CursoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
