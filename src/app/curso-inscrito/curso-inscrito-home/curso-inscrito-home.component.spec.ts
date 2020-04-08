import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoInscritoHomeComponent } from './curso-inscrito-home.component';

describe('CursoInscritoHomeComponent', () => {
  let component: CursoInscritoHomeComponent;
  let fixture: ComponentFixture<CursoInscritoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoInscritoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoInscritoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
