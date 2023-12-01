import { Injectable, inject } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../../interfaces/IUser';
import {
  SpotifyPlayListToPlayListDTO,
  SpotifyPlaylistDataDTO,
  SpotifyTopArtistDataDTO,
  SpotifyTrackDataDTO,
  SpotifyUserDataDTO,
} from '../../shared/helpers/spotify.helper';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from 'src/app/interfaces/IArtist';
import { IMusic } from 'src/app/interfaces/IMusic';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs;
  user: IUser;

  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async startUser(): Promise<boolean> {
    if (this.user) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      this.setAccessToken(token);
      await this.getSpotifyUserData();
      return !!this.user;
    } catch (error) {
      return false;
    }
  }

  async getSpotifyUserData(): Promise<Error | null> {
    try {
      const userInfo = await this.spotifyApi.getMe();
      this.user = SpotifyUserDataDTO(userInfo);
      return null;
    } catch (error) {
      return new Error('Error to get user data');
    }
  }

  getUrlLogin(): string {
    const authUrl = `${SpotifyConfiguration.authURL}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectURL}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return `${authUrl}${clientId}${redirectUrl}${scopes}${responseType}`;
  }

  getTokenUrlCallback(): string {
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string): void {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getMusicsPlayList(
    playListId: string,
    offset = 0,
    limit = 50
  ): Promise<IPlaylist | null> {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playListId);

    if (!playlistSpotify) {
      return null;
    }

    const playListResult = SpotifyPlayListToPlayListDTO(playlistSpotify);

    const musicsSpotify = await this.spotifyApi.getPlaylistTracks(playListId, {
      offset,
      limit,
    });

    playListResult.musics = musicsSpotify.items.map((music) =>
      SpotifyTrackDataDTO(music.track as SpotifyApi.TrackObjectFull)
    );

    return playListResult;
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id, {
      limit,
      offset,
    });
    return playlist.items.map(SpotifyPlaylistDataDTO);
  }

  async getTopArtists(limit: number): Promise<IArtist[]> {
    const topArtists = await this.spotifyApi.getMyTopArtists({ limit });
    return topArtists.items.map(SpotifyTopArtistDataDTO);
  }

  async getMusics(offset = 0, limit = 50): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ limit, offset });
    return musics.items.map((item) => SpotifyTrackDataDTO(item.track));
  }

  async executeMusic(musicUri: string) {
    await this.spotifyApi.queue(musicUri);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackDataDTO(musicSpotify.item);
  }

  async goBackMusic(): Promise<void> {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic(): Promise<void> {
    await this.spotifyApi.skipToNext();
  }

  async searchItemByName(name: string, offset = 0, limit = 5) {
    try {
      const result = await this.spotifyApi.search(name, ['album', 'artist'], {
        limit,
        offset,
      });

      console.log('result: ', result);
      return name;
    } catch (error) {
      console.log('Error searchItemByName: ', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
