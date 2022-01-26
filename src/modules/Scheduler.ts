import { Elevator, ElevatorDirection } from "./Elevator";
import { FloorRequest } from "./System";

interface Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void;
}

export class FCFSScheduler implements Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void {
    for (const [index, request] of queue.entries()) {
      if (request != null) {
        for (const elevator of elevators) {
          if (
            elevator.getDirection() === ElevatorDirection.Dormant &&
            elevator.getRequestedFloor() === null
          ) {
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
