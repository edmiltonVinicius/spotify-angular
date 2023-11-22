import { Injectable, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/shared/factories/track.factory';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnInit {
  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getCurrentMusic();
  }

  async getCurrentMusic(): Promise<void> {
    clearTimeout(this.timerId);
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 3000);
  }

  async backMusic(): Promise<void> {
    await this.spotifyService.goBackMusic();
  }

  async nextMusic(): Promise<void> {
    await this.spotifyService.nextMusic();
  }

  setCurrentMusic(music: IMusic): void {
    this.currentMusic.next(music);
  }
}
