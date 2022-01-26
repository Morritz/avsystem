import { Elevator, ElevatorDirection } from "./Elevator";
import { FloorRequest } from "./System";

function forAllRequests(
  queue: FloorRequest[],
  callback: (index: number, request: number) => void
) {
  for (const [index, request] of queue.entries()) {
    if (request != null) {
      callback(index, request);
    } else {
      queue.splice(index, 1);
    }
  }
}
export interface Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void;
}

export class FCFSScheduler implements Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void {
    forAllRequests(queue, (index, request) => {
      for (const elevator of elevators) {
        if (elevator.getStandby()) {
          if (elevator.dispatchFloor(request)) {
            queue.splice(index, 1);
            break;
          }
        }
      }
    });
  }
}

export class NearestElevatorFCFSScheduler implements Scheduler {
  scheduleElevators(elevators: Elevator[], queue: FloorRequest[]): void {
    forAllRequests(queue, (index, request) => {
      const sortedElevators = [...elevators].sort((a, b) =>
        Math.abs(request - b.getCurrentFloor()) <
        Math.abs(request - a.getCurrentFloor())
          ? 1
          : -1
      );

      for (const elevator of sortedElevators) {
        if (elevator.getStandby()) {
          if (elevator.dispatchFloor(request)) {
            queue.splice(index, 1);
            break;
          }
        }
      }
    });
  }
}
