import { IMusic } from './IMusic';

export interface IPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}

export interface IPlaylistShort {
  id: string;
  name: string;
}
