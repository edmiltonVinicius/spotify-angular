import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from '../home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListMusicComponent } from '../list-music/list-music.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutes,
    TranslateModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [PlayerComponent, HomeComponent, ListMusicComponent],
})
export class PlayerModule {}
