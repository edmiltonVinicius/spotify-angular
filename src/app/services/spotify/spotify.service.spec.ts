import Spotify from 'spotify-web-api-js';
import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let spotifyApiMok: Spotify.SpotifyWebApiJs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyService);
    spotifyApiMok = new Spotify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startUser', () => {
    it('should ', () => {});
  });

  describe('getSpotifyUserData', () => {
    it('should set user data when called', () => {});

    it('should call spotify.getMe method only once', () => {});

    it('should call SpotifyUserDataDTO method only once', () => {});

    it('should call SpotifyUserDataDTO with value returned by spotify.getMe method', () => {});

    it('should throw error when spotify.getMe method throw error', async () => {
      spyOn(spotifyApiMok, 'getMe').and.rejectWith(new Error());
      expect(await service.getSpotifyUserData()).toEqual(
        new Error('Error to get user data')
      );
    });
  });

  describe('getUrlLogin', () => {
    it('should ', () => {});
  });

  describe('getTokenUrlCallback', () => {
    it('should ', () => {});
  });

  describe('setAccessToken', () => {
    it('should set a access token with valid token', () => {
      const token = 'MOCKED_TOKEN';
      spotifyApiMok.setAccessToken(token);
      expect(spotifyApiMok.getAccessToken()).toBe(token);
    });
  });

  describe('getUserPlaylists', () => {
    it('should ', () => {});
  });
});
