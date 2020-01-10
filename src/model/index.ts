import * as uuid from 'uuid';
import { getRandomInt, Subject } from '../helpers';

export type PlayerSkillI = 1 | 2 | 3;
export type PlayerIdI = string;
export type PlayerPositionI = 1 | 2 | 3 | 4 | 5 | 6;
export interface PlayerInfoI {
  position: PlayerPositionI | 0;
  skill: PlayerSkillI | 0;
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
  players: PlayerI[] | PlayerInfoI[];
}

export interface TeamI {
  id: TeamIdI;
  name: TeamNameI;
  players: PlayerI[] | PlayerInfoI[];

  score: number;

  setPlayer(position: PlayerPositionI, player: PlayerI): void;
  setTeam(players: PlayerInfoI[]): void;

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

export type FieldPartI = 'top' | 'bottom' | 'both';

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
      this.unsubscribeFromRound = round.subscribe((hit) => {
        if (hit.toTeam === this.teamName && hit.toPlayer === this.position) {
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

    this.game.currentRound.onHit(hit);
  }
}

const emptyPlayer: PlayerInfoI = {
  position: 0,
  skill: 0,
};

export class Team implements TeamI {
  public id = uuid();
  public players = Array(6)
    .fill(emptyPlayer)
    .map((player, i) => ({ ...player, position: i + 1 }));
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
  setTeam(players: PlayerInfoI[]): void {
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

  constructor(public firstHitTeam: TeamNameI) {
    super();
  }

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
  initRound(teamName) {
    const newRound = new Round(teamName);
    this.rounds.push(newRound);
    this.currentRound = newRound;

    this.subscribers.forEach((h) => h(newRound));
  }
}
