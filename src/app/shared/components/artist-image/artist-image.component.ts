import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artist-image',
  templateUrl: './artist-image.component.html',
  styleUrls: ['./artist-image.component.scss'],
})
export class ArtistImageComponent {
  @Input() image = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
