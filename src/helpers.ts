import {
  FieldPartI,
  PlayerInfoI,
  PlayerPositionI,
  PlayerSkillI,
} from './model';

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

export class Subject<SharedProperty> {
  protected subscribers = [];

  subscribe(handler: (value: SharedProperty) => void) {
    const index = this.subscribers.length;
    this.subscribers[index] = handler;
    return () => {
      this.subscribers.splice(index, 1);
    };
  }

  beforeDelete() {
    this.subscribers = [];
  }
}

// export const mapCellToPosition = (
//   fieldPart: FieldPartI,
//   cell: number,
// ): PlayerPositionI => {
//   if (fieldPart === 'top') {
//     if (cell === 0) return 1;
//     if (cell === 1) return 6;
//     if (cell === 2) return 5;
//     if (cell === 3) return 2;
//     if (cell === 4) return 3;
//     if (cell === 5) return 4;
//   }
// };

export const convertPositionToCell = (
  fieldPart: FieldPartI,
  position: PlayerPositionI | 0,
): number => {
  if (fieldPart === 'top') {
    if (position === 1) return 0;
    if (position === 2) return 3;
    if (position === 3) return 4;
    if (position === 4) return 5;
    if (position === 5) return 2;
    if (position === 6) return 1;
  } else if (fieldPart === 'bottom') {
    if (position === 1) return 5;
    if (position === 2) return 2;
    if (position === 3) return 1;
    if (position === 4) return 0;
    if (position === 5) return 3;
    if (position === 6) return 4;
  }
};

export const sortPlayersArrayAccordingToCells = (
  fieldPart: FieldPartI,
  players: PlayerInfoI[],
): PlayerInfoI[] => {
  const sorted = [];
  players.forEach((player) => {
    sorted[convertPositionToCell(fieldPart, player.position)] = player;
  });
  return sorted;
};

export const checkIfCanSetLevel = (
  players: PlayerInfoI[],
  level: PlayerSkillI | 0,
): boolean => {
  if (level === 0) return true;

  const counter = [0, 0, 0];

  players.forEach(({ skill }) => counter[skill - 1]++);

  return counter[level - 1] < 2;
};
