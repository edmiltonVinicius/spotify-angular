import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent {
  searchText = '';
  recentSearches = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Funk Hits',
    'Pagodeira',
  ];

  setSearch(search: string): void {
    this.searchText = search;
  }

  search(): void {
    console.log('Buscando....', this.searchText);
  }
}
