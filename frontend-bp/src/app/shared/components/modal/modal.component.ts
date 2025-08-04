import { Component, HostListener, input, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-component-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent {
  // Inputs
  public readonly isOpen = input<boolean>(false);
  public readonly title = input<string>('');
  public readonly size = input<'small' | 'medium' | 'large'>('medium');
  public readonly closeOnOverlayClick = input<boolean>(true);
  public readonly showFooter = input<boolean>(false);

  // Outputs
  public readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  // Handle escape key to close the modal
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen()) {
      this.close();
    }
  }

}
