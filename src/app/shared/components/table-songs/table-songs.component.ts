import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { PlayerService } from 'src/app/services/player/player.service';
import { newMusic } from '../../factories/track.factory';

@Component({
  selector: 'app-table-songs',
  templateUrl: './table-songs.component.html',
  styleUrls: ['./table-songs.component.scss'],
})
export class TableSongsComponent implements OnInit, OnDestroy {
  playIcon = faPlay;
  currentMusic: IMusic = newMusic();
  subscriptions: Subscription[] = [];

  @Input({ required: true })
  listMusics: IMusic[];

  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic(): void {
    const sub = this.playerService.currentMusic.subscribe({
      next: (music) => {
        this.currentMusic = music;
      },
    });

    this.subscriptions.push(sub);
  }

  concatArtistsName(music: IMusic): string {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async executeMusic(music: IMusic): Promise<void> {
    this.playerService.setCurrentMusic(music);
    // await this.spotifyService.executeMusic(music.uri);
  }
}
