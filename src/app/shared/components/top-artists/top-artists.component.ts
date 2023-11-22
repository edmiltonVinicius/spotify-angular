import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { Component, OnInit, inject } from '@angular/core';
import { IArtist } from 'src/app/interfaces/IArtist';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  artists: IArtist[] = [];

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists(): Promise<void> {
    this.artists = await this.spotifyService.getTopArtists(5);
  }
}
