import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from '../../factories/track.factory';
import { PlayerService } from 'src/app/services/player/player.service';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  music: IMusic = newMusic();
  subs: Subscription[] = [];
  hasMusicPlaying = false;

  backIcon = faStepBackward;
  nextIcon = faStepForward;

  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getMusicPlaying();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getMusicPlaying(): void {
    const subscription = this.playerService.currentMusic.subscribe({
      next: (music) => {
        this.hasMusicPlaying = music.title !== '';
        this.music = music;
      },
    });

    this.subs.push(subscription);
  }

  backMusic(): void {
    this.playerService.backMusic();
  }

  nextMusic(): void {
    this.playerService.nextMusic();
  }
}
