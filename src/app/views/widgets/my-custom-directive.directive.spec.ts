import { TestBed } from '@angular/core/testing';
import { MyCustomDirectiveDirective } from './my-custom-directive.directive';

describe('MyCustomDirectiveDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCustomDirectiveDirective]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(MyCustomDirectiveDirective);
    expect(directive).toBeTruthy();
  });
});
