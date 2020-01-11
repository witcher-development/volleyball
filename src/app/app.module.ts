import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormModule } from './form/form.module';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormModule, GameModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
