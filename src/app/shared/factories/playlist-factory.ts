import { IPlaylist } from 'src/app/interfaces/IPlaylist';

export function newPlayList(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  };
}
