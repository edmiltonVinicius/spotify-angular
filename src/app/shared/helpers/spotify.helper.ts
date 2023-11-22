import { IArtist } from 'src/app/interfaces/IArtist';
import { IMusic } from 'src/app/interfaces/IMusic';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { IUser } from 'src/app/interfaces/IUser';
import { mileSecondsToMinute } from './time.helper';
import { newPlayList } from '../factories/playlist-factory';

export function SpotifyUserDataDTO(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images[0].url,
  };
}

export function SpotifyPlaylistDataDTO(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.length && playlist.images.pop().url,
  };
}

export function SpotifyPlayListToPlayListDTO(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  if (!playlist) return newPlayList();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.length && playlist.images.pop().url,
  };
}

export function SpotifyTopArtistDataDTO(
  artist: SpotifyApi.ArtistObjectFull
): IArtist {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.length && artist.images.pop().url,
  };
}

export function SpotifyTrackDataDTO(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusic {
  return {
    uri: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.album.id,
      name: spotifyTrack.album.name,
      imageUrl:
        spotifyTrack.album.images.length &&
        spotifyTrack.album.images.shift().url,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: mileSecondsToMinute(spotifyTrack.duration_ms),
  };
}
