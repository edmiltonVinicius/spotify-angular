import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {
  recentSearches: string[];
  inputSearch = new FormControl('');

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {
    this.inputSearch.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > 3),
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => console.log(value)),
        switchMap((value) => this.spotifyService.searchItemByName(value)),
        catchError((error, source) => {
          return source.pipe(startWith(''));
        })
      )
      .subscribe({
        next: (result: string | null) => console.log('onSearch: ', result),
        error: (error) => console.log('error: ', error),
      });
  }

  setSearch(item: any): void {
    console.log('Buscando: ', item);
  }
}
