import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPipelineComponent } from './add-pipeline.component';

describe('AddPipelineComponent', () => {
  let component: AddPipelineComponent;
  let fixture: ComponentFixture<AddPipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPipelineComponent]
    });
    fixture = TestBed.createComponent(AddPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
