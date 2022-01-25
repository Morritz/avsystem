interface Scheduler {
  scheduleElevators(): void;
}

class BasicScheduler implements Scheduler {
  scheduleElevators(): void {
    return;
  }
}
