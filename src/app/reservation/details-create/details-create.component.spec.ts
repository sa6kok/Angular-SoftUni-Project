import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsCreateComponent } from './details-create.component';


describe('DetailsComponent', () => {
  let component: DetailsCreateComponent;
  let fixture: ComponentFixture<DetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
