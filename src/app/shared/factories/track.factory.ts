import { IMusic } from 'src/app/interfaces/IMusic';

export function newMusic(): IMusic {
  return {
    uri: '',
    title: '',
    album: { id: '', name: '', imageUrl: '' },
    artists: [{ id: '', name: '' }],
    time: '',
  };
}
