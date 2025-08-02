import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'shared-component-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dropdown.component.html',
  styles: ``
})
export class DropdownComponent {
  // Inputs
  public readonly buttonText = input<String>('Acciones');
  public readonly buttonVariant = input<'primary' | 'secondary'>('secondary');
  // Events (father dropdown)
  public onItemSelected = output<string>();
  // Variables
  public readonly isDropdownOpen = signal(false);

  public toggleDropdown(): void {
    this.isDropdownOpen.update(open => !open);
  }

  public closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  public handleItemClick(action: string): void {
    this.isDropdownOpen.update(() => false);
    this.onItemSelected.emit(action);
  }

}
