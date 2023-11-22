import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/shared/factories/track.factory';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss'],
})
export class ListMusicComponent implements OnInit, OnDestroy {
  isLoading = true;

  bannerImagUrl = '';
  bannerTitle = '';

  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  iconPaly = faPlay;
  iconLoading = faTruckLoading;

  subs: Subscription[] = [];

  private activatedRoute = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getMusics();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  setDataPage(
    bannerTitle: string,
    bannerImage: string,
    musics: IMusic[]
  ): void {
    this.bannerTitle = bannerTitle;
    this.bannerImagUrl = bannerImage;
    this.musics = musics;
  }

  getMusics(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: async (params) => {
        this.isLoading = true;

        const type = params.get('type');
        const id = params.get('id');

        await this.getPageData(type, id);
      },
    });

    this.subs.push(subscription);
  }

  async getPageData(type: string, id: string): Promise<void> {
    if (type === 'playlist') {
      await this.getDataPlayList(id);
      return;
    }

    await this.getDataArtist(id);
  }

  async getDataPlayList(playListId: string): Promise<void> {
    const playListMusics = await this.spotifyService.getMusicsPlayList(
      playListId
    );

    this.setDataPage(
      playListMusics.name,
      playListMusics.imageUrl,
      playListMusics.musics
    );

    this.isLoading = false;
  }

  async getDataArtist(artist: string): Promise<void> {}
}
