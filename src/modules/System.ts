import { Config } from "./Config";
import { Elevator } from "./Elevator";
import { Scheduler } from "./Scheduler";
import util from "util";

import http from "http";
import express from "express";
import { AddressInfo } from "net";

export type FloorRequest = number | null;

export class System {
  private readonly config: Config;
  private readonly maxFloor: number = 16;
  private readonly elevators: Elevator[];
  private readonly scheduler: Scheduler;
  private readonly queue: FloorRequest[];

  private readonly app: express.Application;
  private server: http.Server | undefined;

  constructor(configRef: Config) {
    this.config = configRef;

    this.elevators = Array.from(
      { length: this.config.getElevatorsCount() },
      () => new Elevator(this)
    );

    this.scheduler = this.config.loadScheduler();

    this.maxFloor = this.config.getMaxFloor();

    this.queue = new Array<FloorRequest>();

    this.app = express();

    this.setupServer();
  }

  private setupServer(): void {
    this.app.get("/call/:id", (req: express.Request, res: express.Response) => {
      const requestedFloor = parseInt(req.params.id);
      if (Number.isInteger(requestedFloor)) this.call(requestedFloor);
      res.sendStatus(200);
    });

    this.server = this.app.listen(9999);
  }

  private addRequestToQueue(floor: number): void {
    this.queue.push(floor);
  }

  private checkIfRequestDoesntExist(floor: number): boolean {
    for (const request of this.queue) {
      if (request === floor) return false;
    }
    for (const elevator of this.elevators) {
      if (elevator.getRequestedFloor() === floor) return false;
    }
    return true;
  }

  private checkIfThereIsReadyElevator(floor: number): Elevator | null {
    for (const elevator of this.elevators) {
      if (elevator.getCurrentFloor() === floor && elevator.getStandby())
        return elevator;
    }
    return null;
  }

  public call(floor: number) {
    try {
      this.floorGuard(floor);
      const readyElevator = this.checkIfThereIsReadyElevator(floor);
      if (readyElevator) {
        readyElevator.tryToOpenDoor();
      } else if (this.checkIfRequestDoesntExist(floor))
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
    if (this.server && this.server.listening) {
      const addr = this.server.address() as AddressInfo;
      console.log(`‍💻 REST Server: ${addr.address}:${addr.port}`);
      console.log("✨ Usage: GET /call/:id");
    }
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
