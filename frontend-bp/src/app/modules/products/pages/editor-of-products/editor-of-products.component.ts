import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'products-editor-of-products',
  imports: [
    CardComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './editor-of-products.component.html',
  styles: ``,
})
export default class EditorOfProductsComponent {
  public readonly title = 'Editor de Productos';

  private _fb = inject(FormBuilder);

  public productForm = this._fb.group({
    id: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]],
    logo: ['', [
      Validators.required
    ]],
    date_release: ['', [
      Validators.required
    ]],
    date_revision: ['', [
      Validators.required
    ]],
  });

  public isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  public resetForm(): void {
    this.productForm.reset();
  }

}
