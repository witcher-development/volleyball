import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharingModule } from '../sharing/sharing.module';

import { GameComponent } from './game.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [GameComponent, TeamComponent],
  imports: [CommonModule, SharingModule],
  exports: [GameComponent],
})
export class GameModule {}
