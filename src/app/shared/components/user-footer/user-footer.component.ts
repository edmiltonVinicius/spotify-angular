import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, inject, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss'],
})
export class UserFooterComponent implements OnInit {
  exitIcon = faSignOutAlt;
  user: IUser = null;

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout(): void {
    this.spotifyService.logout();
  }
}
