import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussComponent } from './discuss.component';

describe('DiscussComponent', () => {
  let component: DiscussComponent;
  let fixture: ComponentFixture<DiscussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
