import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IMusic } from 'src/app/interfaces/IMusic';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player/player.service';
import { newMusic } from 'src/app/shared/factories/track.factory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();
  playIcon = faPlay;
  subscriptions: Subscription[] = [];

  private spotifyService = inject(SpotifyService);
  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  concatArtistsName(music: IMusic): string {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  getCurrentMusic(): void {
    const sub = this.playerService.currentMusic.subscribe({
      next: (music) => {
        this.currentMusic = music;
      },
    });

    this.subscriptions.push(sub);
  }

  async getMusics(): Promise<void> {
    this.musics = await this.spotifyService.getMusics();
  }

  async executeMusic(music: IMusic): Promise<void> {
    this.playerService.setCurrentMusic(music);
    // await this.spotifyService.executeMusic(music.uri);
  }
}
