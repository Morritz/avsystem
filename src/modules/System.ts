import { Config } from "./Config";
import { Elevator } from "./Elevator";
import { Scheduler } from "./Scheduler";
import util from "util";

export type FloorRequest = number | null;

export class System {
  private readonly config: Config;
  private readonly maxFloor: number = 16;
  private readonly elevators: Elevator[];
  private readonly scheduler: Scheduler;
  private readonly queue: FloorRequest[];

  constructor(configRef: Config) {
    this.config = configRef;

    this.elevators = Array.from(
      { length: this.config.getElevatorsCount() },
      () => new Elevator(this)
    );

    this.scheduler = this.config.loadScheduler();

    this.maxFloor = this.config.getMaxFloor();

    this.queue = new Array<FloorRequest>();
  }

  private addRequestToQueue(floor: number): void {
    this.queue.push(floor);
  }

  public call(floor: number) {
    try {
      this.floorGuard(floor);
      this.addRequestToQueue(floor);
    } catch (e) {
      console.log("Wrong floor requested");
    }
  }
  public scheduleElevators(): void {
    this.scheduler.scheduleElevators(this.elevators, this.queue);
  }

  public floorGuard(floor: number): void {
    if (floor < 0 || floor > this.maxFloor) {
      throw new Error("Floor out of bounds - exception");
    }
  }

  public displayStatus(): void {
    console.clear();
    util.log("Current status of the system.");
    const table = [];
    for (const [id, elevator] of this.elevators.entries()) {
      table.push({
        id: id,
        direction: elevator.getReadableDirection(),
        currentFloor: elevator.getCurrentFloor(),
        requestedFloor: elevator.getRequestedFloor(),
        doorState: elevator.getReadableDoorState(),
      });
    }
    console.table(table);
  }

  public run(): void {
    this.scheduleElevators();
    setImmediate(() => this.run());
  }
}
