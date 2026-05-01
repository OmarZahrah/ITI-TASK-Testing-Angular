import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Status } from './status';
import { By } from '@angular/platform-browser';

describe('Status component', () => {
  let component: Status;
  let fixture: ComponentFixture<Status>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Status],
    }).compileComponents();

    fixture = TestBed.createComponent(Status);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render initial status as "♥ 0" and button not liked', async () => {
    // Verify initial state
    expect(component.status()).toBe(0);
    expect(component.isLiked()).toBe(false);

    // Access button element
    let button = fixture.debugElement.query(By.css('#statusBtn'));

    // Assert button text contains ♥ and 0
    expect(button.nativeElement.textContent).toContain('♥');
    expect(button.nativeElement.textContent).toContain('0');

    // Assert liked class is not present
    expect(button.nativeElement.classList.contains('liked')).toBe(false);
  });

  it('should increment status to 1 and mark button as liked when clicked once', async () => {
    // Get button element
    let button = fixture.debugElement.query(By.css('#statusBtn'));

    // Click button once
    button.triggerEventHandler('click');
    fixture.detectChanges();
    await fixture.whenStable();

    // Verify status incremented to 1
    expect(component.status()).toBe(1);
    expect(component.isLiked()).toBe(true);

    // Verify button shows correct text
    expect(button.nativeElement.textContent).toContain('♥');
    expect(button.nativeElement.textContent).toContain('1');

    // Verify liked class is applied
    expect(button.nativeElement.classList.contains('liked')).toBe(true);
  });

  it('should decrement status back to 0 and remove liked class when clicked twice', async () => {
    // Get button element
    let button = fixture.debugElement.query(By.css('#statusBtn'));

    // Click button once to increment
    button.triggerEventHandler('click');
    fixture.detectChanges();
    await fixture.whenStable();

    // Click button second time to decrement
    button.triggerEventHandler('click');
    fixture.detectChanges();
    await fixture.whenStable();

    // Verify status decremented back to 0
    expect(component.status()).toBe(0);
    expect(component.isLiked()).toBe(false);

    // Verify button shows correct text
    expect(button.nativeElement.textContent).toContain('♥');
    expect(button.nativeElement.textContent).toContain('0');

    // Verify liked class is removed
    expect(button.nativeElement.classList.contains('liked')).toBe(false);
  });
});
