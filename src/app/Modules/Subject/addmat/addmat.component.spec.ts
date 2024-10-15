import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmatComponent } from './addmat.component';

describe('AddmatComponent', () => {
  let component: AddmatComponent;
  let fixture: ComponentFixture<AddmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
