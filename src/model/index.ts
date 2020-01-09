import * as uuid from 'uuid';
import { getRandomInt, Subject } from '../helpers';

export type PlayerSkillI = 1 | 2 | 3;
export type PlayerIdI = string;
export type PlayerPositionI = 1 | 2 | 3 | 4 | 5 | 6;
export interface PlayerInfo {
  position: PlayerPositionI;
  skill: PlayerSkillI;
}

export interface PlayerI {
  id: PlayerIdI;
  teamName: TeamNameI;

  position: PlayerPositionI;
  skill: PlayerSkillI;

  unsubscribeFromGame: () => void;
  unsubscribeFromRound: () => void;

  makeHit(
    team: TeamNameI,
    direction: PlayerPositionI,
    power: HitPowerI,
    angle: HitAngleI,
  ): void;
}

export type TeamIdI = string;
export type TeamNameI = string;
export interface TeamInfoI {
  name: TeamNameI;
  players: PlayerI[];
}

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
  team1?: TeamI;
  team2?: TeamI;
}

export type HitPowerI = 1 | 2 | 3 | 4 | 5;
export type HitAngleI = 'arc' | 'line';

export interface HitI {
  id: number;

  fromTeam: TeamNameI;
  toTeam: TeamNameI;

  fromPlayer: PlayerPositionI;
  toPlayer: PlayerPositionI;

  power: HitPowerI;
  angle: HitAngleI;
}

export type RoundIdI = string;

export interface RoundI {
  id: RoundIdI;
  hits: HitI[];

  onHit(hit: HitI): void;
}

export interface GameI {
  field: FieldI;
  rounds: RoundI[];
  currentRound: RoundI;

  initGame(teamName1: TeamNameI, teamName2: TeamNameI): void;
  initRound(startingTeam: TeamNameI): void;
}

export class Player implements PlayerI {
  public id = uuid();
  public unsubscribeFromGame;
  public unsubscribeFromRound;

  constructor(
    public teamName,
    public position,
    public skill,
    private game: Game,
  ) {
    this.unsubscribeFromGame = game.subscribe((round) => {
      console.log('new round!');
      this.unsubscribeFromRound = round.subscribe((hit) => {
        if (hit.toTeam === this.teamName && hit.toPlayer === this.position) {
          console.log(this.teamName, '- player', this.position, ': I got hit!');
        }
      });
    });
  }

  makeHit(team, direction, power, angle) {
    const hit = new Hit(
      this.teamName,
      team,
      this.position,
      direction,
      power,
      angle,
    );

    console.log(this.teamName, '- player', this.position, ': I made a hit!');

    this.game.currentRound.onHit(hit);
  }
}

export class Team implements TeamI {
  public id = uuid();
  public players = [];
  public score = 0;

  constructor(public game, public name) {}

  setPlayer(position, skill) {
    this.players[position - 1] = new Player(
      this.name,
      position,
      skill,
      this.game,
    );
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

export class Hit implements HitI {
  public id = uuid();

  constructor(
    public fromTeam,
    public toTeam,
    public fromPlayer,
    public toPlayer,
    public power,
    public angle,
  ) {}
}

export class Round extends Subject<Hit> implements RoundI {
  public id = uuid();
  public hits = [];

  onHit(hit) {
    this.hits.push(hit);
    this.subscribers.forEach((handler) => handler(hit));
  }
}

export class Game extends Subject<Round> implements GameI {
  public field = {};
  public rounds = [];
  public currentRound;

  initGame(name1, name2) {
    this.field[name1] = new Team(this, name1);
    this.field[name2] = new Team(this, name2);
  }
  initRound(team) {
    const newRound = new Round();
    this.rounds.push(newRound);
    this.currentRound = newRound;

    this.subscribers.forEach((h) => h(newRound));
  }
}
