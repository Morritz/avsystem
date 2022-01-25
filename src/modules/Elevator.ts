import { System } from "./System";

enum ElevatorDirection {
  Up,
  Down,
  Dormant,
}

export class Elevator {
  public currentFloor: number;
  public direction: ElevatorDirection;
  private systemReference: System;

  constructor(systemReference: System) {
    this.systemReference = systemReference;
    this.currentFloor = 0;
    this.direction = ElevatorDirection.Dormant;
  }
}
