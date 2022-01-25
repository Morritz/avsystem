export interface Scheduler {
  scheduleElevators(): void;
}

export class BasicScheduler implements Scheduler {
  scheduleElevators(): void {
    return;
  }
}
