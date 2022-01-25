import { Config } from "./Config";
import { Elevator } from "./Elevator";
import { Scheduler } from "./Scheduler";

export class System {
  private readonly config: Config;
  private readonly maxFloor: number = 16;
  private readonly elevators: Array<Elevator>;
  private readonly scheduler: Scheduler;

  constructor(configRef: Config) {
    this.config = configRef;

    this.elevators = Array.from(
      { length: this.config.getElevatorsCount() },
      () => new Elevator(this)
    );

    this.scheduler = this.config.loadScheduler();

    this.maxFloor = this.config.getMaxFloor();
  }

  public scheduleElevators(): void {
    return this.scheduler.scheduleElevators();
  }
}
