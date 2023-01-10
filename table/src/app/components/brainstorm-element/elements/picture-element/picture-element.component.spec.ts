import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PictureElementComponent} from './picture-element.component';

describe('PictureElementComponent', () => {
  let component: PictureElementComponent;
  let fixture: ComponentFixture<PictureElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureElementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PictureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
