import { Component, input, output } from '@angular/core';

@Component({
  selector: 'shared-ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styles: ``
})
export class ButtonComponent {
  public readonly type     = input<'button' | 'submit' | 'reset'>('button');
  public readonly variant  = input<'primary' | 'secondary' | 'text'>('primary');
  public readonly outline  = input<boolean>(false);
  public readonly disabled = input<boolean>(false);
  public readonly loading  = input<boolean>(false);
  public readonly click    = output<Event>();

  public handleClick(event: Event): void {
    event.stopPropagation();
    // If the button is disabled or loading, do not emit the clicked event
    if (this.disabled() || this.loading()) return;
    this.click.emit(event);
  }

}
