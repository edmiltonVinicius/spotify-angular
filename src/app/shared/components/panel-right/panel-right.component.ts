import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-panel-right',
  templateUrl: './panel-right.component.html',
  styleUrls: ['./panel-right.component.scss'],
})
export class PanelRightComponent {}
