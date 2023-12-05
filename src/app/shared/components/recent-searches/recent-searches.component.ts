import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { IPlaylistShort } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {
  recentSearches: IPlaylistShort[];
  inputSearch = new FormControl('');
  noResults = false;

  private spotifyService = inject(SpotifyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {
    this.inputSearch.valueChanges
      .pipe(
        map((name) => name.trim()),
        filter((name) => name.length > 3),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((name) => this.spotifyService.searchPlaylistByName(name)),
        catchError((error, source) => {
          return source.pipe(startWith([]));
        })
      )
      .subscribe({
        next: (results: IPlaylistShort[]) => {
          if (!results.length) {
            this.noResults = true;
            return;
          }

          this.recentSearches = results;
          this.noResults = false;
        },
      });
  }

  setSearch(item: IPlaylistShort): void {
    this.router.navigate([`player/list/playlist/${item.id}`]);
  }
}
