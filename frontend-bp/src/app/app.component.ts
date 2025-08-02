import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ButtonComponent } from './shared/ui/button/button.component';

@Component({
  selector: 'app-root',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'frontend-bp';

  public isDarkMode: boolean = false;
  public modalIsOpen = signal(false);

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  public openModal(): void { this.modalIsOpen.set(true); }
  public onModalClosed(): void { this.modalIsOpen.set(false); }

}
