import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IMusic } from 'src/app/interfaces/IMusic';
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
  subscriptions: Subscription[] = [];

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getMusics();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async getMusics(): Promise<void> {
    this.musics = await this.spotifyService.getMusics();
  }
}
