export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

export class Subject<SharedProperty> {
  protected subscribers = [];

  subscribe(handler: (value: SharedProperty) => void) {
    const index = this.subscribers.length + 1;
    this.subscribers[index] = handler;
    return () => {
      delete this.subscribers[index];
    };
  }

  beforeDelete() {
    this.subscribers = [];
  }
}
