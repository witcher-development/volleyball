export type PlayerSkillI = 1 | 2 | 3;
export type PlayerIdI = number;

export interface PlayerI {
  id: PlayerIdI;
  skill: PlayerSkillI;
}

export type TeamIdI = number;

export interface TeamI {
  id: TeamIdI;
  players: PlayerI[];
}

export interface FieldI {
  team1: TeamI;
  team2: TeamI;
}

export type ShootPowerI = 1 | 2 | 3 | 4 | 5;
export type ShootAngleI = 'arc' | 'line';

export interface ShootI {
  id: number;

  fromTeam: TeamIdI;
  fromPlayer: PlayerIdI;
  toPlayer: PlayerIdI;

  power: ShootPowerI;
  angle: ShootAngleI;
}

export type RoundIdI = number;

export interface RoundI {
  id: RoundIdI;
  startingTeam: TeamI;
  shoots: ShootI[];
}

export interface GameI {
  field: FieldI;
  rounds: RoundI[];
  currentRoundId: RoundIdI;

  initTeams(): void;
}

export class Game implements GameI {
  constructor() {
    // this.field = this.initTeams();
  }

  initTeams() {}
}
