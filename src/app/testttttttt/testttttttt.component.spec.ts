import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttttttttComponent } from './testttttttt.component';

describe('TesttttttttComponent', () => {
  let component: TesttttttttComponent;
  let fixture: ComponentFixture<TesttttttttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesttttttttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesttttttttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
