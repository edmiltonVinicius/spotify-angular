import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuSelected = 'home';

  iconHome = faHome;
  iconGuitar = faGuitar;
  iconMusic = faMusic;

  playLists: IPlaylist[] = [];

  private spotifyService = inject(SpotifyService);
  private router = inject(Router);

  ngOnInit() {
    this.getPlaylist();
  }

  onClickMenu(optionSelected: string): void {
    this.menuSelected = optionSelected;
    this.router.navigate([`/player/${optionSelected}`]);
  }

  checkIfMenuIsSelected(optionSelected: string): boolean {
    return this.menuSelected === optionSelected;
  }

  async getPlaylist(): Promise<void> {
    this.playLists = await this.spotifyService.getUserPlaylists();
  }

  goPlayList(playlistId: string): void {
    this.menuSelected = playlistId;
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`);
  }
}
