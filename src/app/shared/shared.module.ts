import { NgModule } from '@angular/core';
import { SwitchTranslateComponent } from './components/switch-translate/switch-translate.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonMenuComponent } from './components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { TopArtistComponent } from './components/top-artist/top-artist.component';
import { PanelRightComponent } from './components/panel-right/panel-right.component';
import { TableLikedSongsComponent } from './components/table-liked-songs/table-liked-songs.component';
import { RecentSearchesComponent } from './components/recent-searches/recent-searches.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from './components/top-artists/top-artists.component';
import { ArtistImageComponent } from './components/artist-image/artist-image.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { BannerComponent } from './components/banner/banner.component';

const components = [
  SwitchTranslateComponent,
  SidebarComponent,
  ButtonMenuComponent,
  UserFooterComponent,
  TopArtistComponent,
  PanelRightComponent,
  TableLikedSongsComponent,
  RecentSearchesComponent,
  TopArtistsComponent,
  ArtistImageComponent,
  PlayerCardComponent,
  BannerComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, TranslateModule, FontAwesomeModule, FormsModule],
  exports: [...components],
})
export class SharedModule {}
