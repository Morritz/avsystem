import { FloorRequest, System } from "./System";

export enum ElevatorDirection {
  Up,
  Down,
  Dormant,
}

export enum DoorState {
  Open,
  Closed,
  Stuck,
}

export class Elevator {
  private currentFloor: number;
  private requestedFloor: FloorRequest;
  private direction: ElevatorDirection;
  private systemReference: System;
  private doorState: DoorState;

  constructor(systemReference: System) {
    this.systemReference = systemReference;
    this.currentFloor = 15;
    this.requestedFloor = null;
    this.direction = ElevatorDirection.Dormant;
    this.doorState = DoorState.Closed;

    // 1 tick = 1 floor distance
    setInterval(() => this.lifecycle(), 1000);
  }

  // Returns true if dispatch was succesfully acquired
  public dispatchFloor(floor: number): boolean {
    if (this.doorState !== DoorState.Stuck) {
      this.systemReference.floorGuard(floor);
      if (this.currentFloor < floor) this.direction = ElevatorDirection.Up;
      else if (this.currentFloor > floor)
        this.direction = ElevatorDirection.Down;
      else this.direction = ElevatorDirection.Dormant;

      this.requestedFloor = floor;
      return true;
    }
    return false;
  }

  public getReadableDirection(): string {
    switch (this.direction) {
      case ElevatorDirection.Up:
        return "Up";
      case ElevatorDirection.Down:
        return "Down";
      case ElevatorDirection.Dormant:
        return "Dormant";
    }
  }

  public getReadableDoorState(): string {
    switch (this.doorState) {
      case DoorState.Open:
        return "Open";
      case DoorState.Closed:
        return "Closed";
      case DoorState.Stuck:
        return "Stuck";
    }
  }

  private move(diff: 1 | -1): void {
    const newFloor = this.currentFloor + diff;
    this.systemReference.floorGuard(newFloor);
    this.currentFloor = newFloor;
  }
  private moveUp() {
    this.move(1);
  }
  private moveDown() {
    this.move(-1);
  }

  private tryToOpenDoor(): void {
    if (this.doorState !== DoorState.Stuck) {
      this.doorState = DoorState.Open;
      setTimeout(() => {
        this.tryToCloseDoor();
      }, 3000);
    }
  }

  private tryToCloseDoor(): void {
    if (this.doorState !== DoorState.Stuck) {
      this.doorState = DoorState.Closed;
    }
  }

  private arrivalState(): void {
    this.direction = ElevatorDirection.Dormant;
    this.requestedFloor = null;
    this.tryToOpenDoor();
  }
  private makeMove(): void {
    if (this.currentFloor === this.requestedFloor) {
      this.arrivalState();
      return;
    }
    if (this.requestedFloor != null) {
      switch (this.direction) {
        case ElevatorDirection.Up:
          this.moveUp();
          return;
        case ElevatorDirection.Down:
          this.moveDown();
          return;
        default:
          return;
      }
    }
  }

  public getCurrentFloor(): FloorRequest {
    return this.currentFloor;
  }

  public getRequestedFloor(): FloorRequest {
    return this.requestedFloor;
  }

  public getDirection(): ElevatorDirection {
    return this.direction;
  }

  public lifecycle(): void {
    this.makeMove();
  }
}
