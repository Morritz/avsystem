import { BasicScheduler, Scheduler } from "./Scheduler";

export class Config {
  public loadScheduler(): Scheduler {
    return new BasicScheduler();
  }
  public getElevatorsCount(): number {
    return 16;
  }
  public getMaxFloor(): number {
    return 16;
  }
}
