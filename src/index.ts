namespace Elevator {
  interface Scheduler {
    scheduleElevators(): void;
  }

  class BasicScheduler implements Scheduler {
    scheduleElevators(): void {
      return;
    }
  }

  class Config {
    loadScheduler(): Scheduler {
      return new BasicScheduler();
    }
  }

  enum ElevatorDirection {
    Up,
    Down,
    Dormant,
  }

  class Elevator {
    public currentFloor: number;
    public direction: ElevatorDirection;

    constructor(data: Pick<Elevator, "currentFloor" | "direction">) {
      this.currentFloor = 0;
      this.direction = ElevatorDirection.Dormant;
      Object.assign(this, data);
    }
  }
}
