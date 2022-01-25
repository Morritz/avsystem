import { Elevator, ElevatorDirection } from "./Elevator";
import { FloorRequest } from "./System";

export interface Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void;
}

export class FCFSScheduler implements Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void {
    for (const request of queue) {
      if (request != null) {
        for (const elevator of elevators) {
          if (
            elevator.getDirection() === ElevatorDirection.Dormant &&
            elevator.getRequestedFloor() === null
          ) {
            if (elevator.dispatchFloor(request)) {
              queue.shift();
              break;
            }
          }
        }
      }
    }
    return;
  }
}
