import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPropertyComponent } from './details-property.component';

describe('DetailsPropertyComponent', () => {
  let component: DetailsPropertyComponent;
  let fixture: ComponentFixture<DetailsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
