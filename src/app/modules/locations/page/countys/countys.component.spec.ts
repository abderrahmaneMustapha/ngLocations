import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountysComponent } from './countys.component';

describe('CountysComponent', () => {
  let component: CountysComponent;
  let fixture: ComponentFixture<CountysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
