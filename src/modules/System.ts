import { Config } from "./Config";
import { Elevator } from "./Elevator";
import { Scheduler } from "./Scheduler";
import util from "util";

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

  public floorGuard(floor: number): void {
    if (floor < 0 || floor > this.maxFloor) {
      throw new Error("It is not possible to dispatch to this floor");
    }
  }

  public displayStatus() {
    util.log("Current status of the system.");
    for (const elevator of this.elevators) {
      console.log(`[Direction: ${elevator.getReadableDirection()}]`);
    }
  }
}
