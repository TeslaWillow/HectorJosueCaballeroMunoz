import { booleanAttribute, Component, input, output } from '@angular/core';

@Component({
  selector: 'shared-component-dropdown-item',
  imports: [],
  templateUrl: './dropdown-item.component.html',
  styles: ``
})
export class DropdownItemComponent {
  // Input
  public readonly label = input.required<string>();
  public readonly icon = input<string>('');
  public readonly danger = input(false, { transform: booleanAttribute });

  // Output renombrado
  public itemClick = output<void>();

  public handleClick(): void {
    this.itemClick.emit();
  }

}
