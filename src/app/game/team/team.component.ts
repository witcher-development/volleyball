import { Component, Input } from '@angular/core';
import { GameI, PlayerI, TeamNameI } from '../../../model';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input()
  game: GameI;

  @Input()
  teamName: TeamNameI;

  @Input()
  players: PlayerI[];

  getPlayerClass(player: PlayerI) {
    const array = ['player'];
    if (player.isCurrentPlayer) {
      array.push('player__current');
    } else if (
      player.teamName === this.game.currentRound.currentPlayer.teamName
    ) {
      array.push('player__pass');
    } else if (
      player.teamName !== this.game.currentRound.currentPlayer.teamName
    ) {
      array.push('player__attack');
    }
    return array.join(' ');
  }

  onClickPlayer(player: PlayerI) {
    if (player.isCurrentPlayer) return;

    this.game.currentRound.currentPlayer.makeHit(
      player.teamName,
      player.position,
      1,
      'line',
    );
  }
}
