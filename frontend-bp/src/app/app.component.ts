import { Component, inject, signal } from '@angular/core';

import { ModalComponent } from './shared/components/modal/modal.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { TableComponent } from "./shared/ui/table/table.component";
import { TableConfig } from './shared/ui/table/table.interface';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { DropdownItemComponent } from './shared/components/dropdown-item/dropdown-item.component';
import { InputComponent } from './shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    ModalComponent,
    ButtonComponent,
    TableComponent,
    DropdownComponent,
    DropdownItemComponent,
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'frontend-bp';

  private _fb= inject(FormBuilder);

  public isDarkMode: boolean = false;
  public modalIsOpen = signal(false);

  public form: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
    description: ['', Validators.maxLength(200)],
  });

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

  public onSubmit(): void {
    if (this.form.invalid) {
      console.log('Form invalid:', this.form.value);
      this.form.markAllAsTouched();
      return;
    }
    console.log('Form submitted:', this.form.value);
  }

  public handleAction(action: string, row: any): void {
    console.log(`Action: ${action}`, row);
    switch (action) {
      case 'view':
        console.log('Ver: ' + JSON.stringify(row));
        break;
      case 'edit':
        console.log('Editar: ' + JSON.stringify(row));
        break;
      case 'delete':
        console.log('Eliminar: ' + JSON.stringify(row));
        break;
      default:
        console.log('Acción desconocida');
    }
  }

}
