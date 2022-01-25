import { FCFSScheduler, Scheduler } from "./Scheduler";

export class Config {
  public loadScheduler(): Scheduler {
    return new FCFSScheduler();
  }
  public getElevatorsCount(): number {
    return 16;
  }
  public getMaxFloor(): number {
    return 16;
  }
}
