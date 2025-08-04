import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'shared-component-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FontAwesomeModule
  ],
  templateUrl: './dropdown.component.html',
  styles: ``
})
export class DropdownComponent {
  // Inputs
  public readonly buttonText = input<String>('Acciones');
  public readonly buttonVariant = input<'primary' | 'secondary' | 'ghost'>('secondary');
  public readonly outline = input<boolean>(false);
  // Events (father dropdown)
  public onItemSelected = output<string>();
  public readonly faEllipsisVertical = faEllipsisVertical;
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
