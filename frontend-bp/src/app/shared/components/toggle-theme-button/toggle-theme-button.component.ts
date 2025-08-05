import { Component } from '@angular/core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'shared-component-toggle-theme-button',
  imports: [
    FontAwesomeModule,
    ButtonComponent
  ],
  templateUrl: './toggle-theme-button.component.html',
  styleUrls: ['./toggle-theme-button.component.scss']
})
export class ToggleThemeButtonComponent {
  public isDarkMode: boolean = false;
  public faSun = faSun;
  public faMoon = faMoon;

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
