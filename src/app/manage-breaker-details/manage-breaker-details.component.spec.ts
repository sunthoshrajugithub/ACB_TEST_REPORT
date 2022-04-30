import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBreakerDetailsComponent } from './manage-breaker-details.component';

describe('ManageBreakerDetailsComponent', () => {
  let component: ManageBreakerDetailsComponent;
  let fixture: ComponentFixture<ManageBreakerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBreakerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBreakerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
