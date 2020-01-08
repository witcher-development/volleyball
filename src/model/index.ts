import * as uuid from 'uuid';
import { getRandomInt } from '../helpers';

export type PlayerSkillI = 1 | 2 | 3 | 0;
export type PlayerIdI = string;
export type PlayerPositionI = 1 | 2 | 3 | 4 | 5 | 6;
export interface PlayerInfo {
  position: PlayerPositionI;
  skill: PlayerSkillI;
}

export interface PlayerI {
  id: PlayerIdI;
  position: PlayerPositionI;
  skill: PlayerSkillI;

  makeShoot(direction: PlayerIdI, power: ShootPowerI, angle: ShootAngleI): void;
}

export type TeamIdI = string;
export type TeamNameI = string;

export interface TeamI {
  id: TeamIdI;
  name: TeamNameI;
  players: PlayerI[];

  score: number;

  setPlayer(position: PlayerPositionI, player: PlayerI): void;
  setTeam(players: PlayerInfo[]): void;

  randomTeam(): void;
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

  initGame(teams: TeamI[]): void;
  initRound(startingTeam: TeamNameI): void;
}

// export class Shoot implements ShootI {}

export class Player implements PlayerI {
  public id = uuid();
  public position;
  public skill;

  constructor(position, skill) {
    this.position = position;
    this.skill = skill;
  }

  makeShoot(direction, power, angle) {}
}

export class Team implements TeamI {
  public id = uuid();
  public name;
  public players = [];
  public score = 0;

  constructor(teamName = 'DeepMind') {
    this.name = teamName;
  }

  setPlayer(position, skill) {
    this.players[position - 1] = new Player(position, skill);
  }
  setTeam(players: PlayerInfo[]): void {
    players.forEach(({ position, skill }) => {
      this.setPlayer(position, skill);
    });
  }
  randomTeam(): void {
    const skillCounter = [0, 0, 0];

    const getRandomSkillLevel = (): PlayerSkillI => {
      let skill = getRandomInt(3) as PlayerSkillI;

      if (skillCounter[skill - 1] === 2) {
        skill = getRandomSkillLevel();
      } else {
        skillCounter[skill - 1]++;
      }

      return skill;
    };

    for (let i = 1; i < 7; i++) {
      this.setPlayer(i as PlayerPositionI, getRandomSkillLevel());
    }
  }
}

export class Game implements GameI {
  public field;
  public rounds;
  public currentRoundId;

  initGame(teams) {
    this.field[teams[0].name] = teams[0];
    this.field[teams[1].name] = teams[1];

    this.initRound(teams[0].name);
  }
  initRound(startingTeam) {}
}
