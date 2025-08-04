import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent]
    });
    const fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hoverable input set to false by default', () => {
    expect(component.hoverable()).toBe(false);
  });

  it('should have card class', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card');
    expect(card).not.toBeNull();
  });

});
