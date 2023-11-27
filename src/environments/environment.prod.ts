export const environment = {
  production: true,
};

export const SpotifyConfiguration = {
  clientId: 'ac5b6ebd360f443baa87d38fad4c9b65',
  authURL: 'https://accounts.spotify.com/authorize',
  redirectURL: 'http://localhost:4200/login/',
  scopes: [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
    'user-top-read',
    'user-modify-playback-state',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ],
};
