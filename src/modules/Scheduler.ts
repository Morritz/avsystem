import { Elevator, ElevatorDirection } from "./Elevator";
import { FloorRequest } from "./System";

export interface Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void;
}

export class FCFSScheduler implements Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void {
    for (const [index, request] of queue.entries()) {
      if (request != null) {
        for (const elevator of elevators) {
          if (elevator.getStandby()) {
            if (elevator.dispatchFloor(request)) {
              queue.splice(index, 1);
              break;
            }
          }
        }
      }
    }
  }
}
