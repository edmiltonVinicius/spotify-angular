import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private router = inject(Router);
  private spotifyService = inject(SpotifyService);

  async hasPermission(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.handleNotAuthenticated();
      return false;
    }

    try {
      const userCreated = await this.spotifyService.startUser();
      return !!userCreated;
    } catch (error) {
      return false;
    }
  }

  handleNotAuthenticated(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
