import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestActionComponent } from './test-action.component';

describe('TestActionComponent', () => {
  let component: TestActionComponent;
  let fixture: ComponentFixture<TestActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
