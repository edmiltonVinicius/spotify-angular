import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private spotifyService = inject(SpotifyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  verifyTokenUrlCallback(): void {
    const token = this.spotifyService.getTokenUrlCallback();
    if (token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  redirectToLogin(): void {
    window.location.href = this.spotifyService.getUrlLogin();
  }
}
