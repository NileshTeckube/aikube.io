import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPipelineComponent } from './edit-pipeline.component';

describe('EditPipelineComponent', () => {
  let component: EditPipelineComponent;
  let fixture: ComponentFixture<EditPipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPipelineComponent]
    });
    fixture = TestBed.createComponent(EditPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
