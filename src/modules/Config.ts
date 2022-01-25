namespace Elevator {
  class Config {
    loadScheduler(): Scheduler {
      return new BasicScheduler();
    }
  }
}
