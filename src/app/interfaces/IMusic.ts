interface IArtist {
  id: string;
  name: string;
}

interface IAlbum {
  id: string;
  name: string;
  imageUrl: string;
}

export interface IMusic {
  uri: string;
  title: string;
  artists: IArtist[];
  album: IAlbum;
  time: string;
}
