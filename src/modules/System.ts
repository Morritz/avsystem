import { Elevator } from "./Elevator";

export class System {
  public readonly maxFloor: number = 16;
  private elevator: Elevator;

  constructor() {
    this.elevator = new Elevator(this);
  }
}
