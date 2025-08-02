import { booleanAttribute, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: []
})
export class CardComponent {
  public readonly hoverable = input<boolean, boolean>(false, { transform: booleanAttribute });
}
