import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { TableComponent } from "./shared/ui/table/table.component";
import { TableConfig } from './shared/ui/table/table.interface';

@Component({
  selector: 'app-root',
  imports: [ModalComponent, ButtonComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'frontend-bp';

  public isDarkMode: boolean = false;
  public modalIsOpen = signal(false);

  public tableConfig = signal<TableConfig>({
    columns: [
      { key: 'name', label: 'Nombre', sortable: true },
      { key: 'age',  label: 'Age', sortable: true },
    ],
    striped: true,
    hoverable: true
  });

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  public openModal(): void { this.modalIsOpen.set(true); }
  public onModalClosed(): void { this.modalIsOpen.set(false); }

}
