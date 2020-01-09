import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { GameComponent } from './game/game.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { BotFormComponent } from './bot-form/bot-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GameComponent,
    TeamFormComponent,
    BotFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
