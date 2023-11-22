import { Component, OnInit, inject } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { newArtist } from '../../factories/artist.factory';
import { IArtist } from 'src/app/interfaces/IArtist';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent implements OnInit {
  topArtist: IArtist = newArtist();

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getArtist();
  }

  private async getArtist(): Promise<void> {
    const artist = await this.spotifyService.getTopArtists(1);

    if (artist.length) {
      this.topArtist = artist.pop();
    }
  }
}
