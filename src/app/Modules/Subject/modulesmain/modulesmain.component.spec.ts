import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesmainComponent } from './modulesmain.component';

describe('ModulesmainComponent', () => {
  let component: ModulesmainComponent;
  let fixture: ComponentFixture<ModulesmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulesmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
