import { System } from "./System";

enum ElevatorDirection {
  Up,
  Down,
  Dormant,
}

export class Elevator {
  public readonly currentFloor: number;
  private direction: ElevatorDirection;
  private systemReference: System;

  constructor(systemReference: System) {
    this.systemReference = systemReference;
    this.currentFloor = 0;
    this.direction = ElevatorDirection.Dormant;
  }

  public dispatchFloor(floor: number) {
    this.systemReference.floorGuard(floor);
    if (this.currentFloor < floor) this.direction = ElevatorDirection.Up;
    else if (this.currentFloor > floor) this.direction = ElevatorDirection.Down;
    else {
      this.direction = ElevatorDirection.Dormant;
    }
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
}
