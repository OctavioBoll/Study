import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MismateriasComponent } from './mismaterias.component';

describe('MismateriasComponent', () => {
  let component: MismateriasComponent;
  let fixture: ComponentFixture<MismateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MismateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MismateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
