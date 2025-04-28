import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiiiiiiiiiiiiiiiiiiComponent } from './suiiiiiiiiiiiiiiiiii.component';

describe('SuiiiiiiiiiiiiiiiiiiComponent', () => {
  let component: SuiiiiiiiiiiiiiiiiiiComponent;
  let fixture: ComponentFixture<SuiiiiiiiiiiiiiiiiiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiiiiiiiiiiiiiiiiiiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuiiiiiiiiiiiiiiiiiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
