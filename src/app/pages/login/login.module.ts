import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routes';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, LoginRoutes, TranslateModule, SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
