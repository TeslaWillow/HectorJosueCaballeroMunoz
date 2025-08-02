import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownItemComponent } from '../../components/dropdown-item/dropdown-item.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { InputComponent } from '../../components/input/input.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { CardComponent } from '../../ui/card/card.component';
import { TableComponent } from '../../ui/table/table.component';
import { TableConfig } from '../../ui/table/table.interface';

// THIS COMPONENT IS NOT USED IN THE APP, IT IS JUST A SHOWCASE FOR THE SHARED COMPONENTS (FOR DEVELOPMENT PURPOSES).
// This component showcases various shared components in the application.
// It includes a modal, buttons, a table, a dropdown, and an input form.
// It also demonstrates form validation and theming capabilities.

@Component({
  selector: 'shared-page-showcase',
  imports: [
    ModalComponent,
    ButtonComponent,
    TableComponent,
    DropdownComponent,
    DropdownItemComponent,
    InputComponent,
    ReactiveFormsModule,
    CardComponent
  ],
  templateUrl: './components-showcase.component.html',
  styles: ``
})
export class ComponentsShowcaseComponent {
  public title: string = 'shared showcase';
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
