import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss'],
})
export class ButtonMenuComponent {
  @Input({ required: true })
  description: string = '';

  @Input({ required: true })
  isSelected: boolean = false;

  @Output()
  click: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.click.emit();
  }
}
