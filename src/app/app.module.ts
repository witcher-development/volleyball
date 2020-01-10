import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { GameComponent } from './game/game.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { BotFormComponent } from './bot-form/bot-form.component';
import { GridComponent } from './grid/grid.component';
import { FormModalComponent } from './form-modal/form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GameComponent,
    TeamFormComponent,
    BotFormComponent,
    GridComponent,
    FormModalComponent,
  ],
  entryComponents: [FormModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
