import { Component, ElementRef, HostListener, input, output, EventEmitter, inject } from '@angular/core';

@Component({
  selector: 'ui-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent {
  // Inputs modernos
  public readonly isOpen = input<boolean>(false);
  public readonly title = input<string>('');
  public readonly size = input<'small' | 'medium' | 'large'>('medium');
  public readonly closeOnOverlayClick = input<boolean>(true);
  public readonly showFooter = input<boolean>(false);

  // Output moderno
  public readonly closed = output<void>();

  // Inyección moderna
  private readonly elRef = inject(ElementRef);

  close(): void {
    this.closed.emit();
  }

  // Cerrar al presionar Escape
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
