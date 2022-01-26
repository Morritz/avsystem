import { FCFSScheduler, Scheduler } from "./Scheduler";
import fs from "fs";

/*
schema
{
  scheduler: "FCFS",
  elevators: 16,
  maxFloor: 16
}
*/

export class Config {
  private parsedConfig: any;
  constructor(path: string) {
    this.parsedConfig = this.loadFromFile("./config.json");
  }

  private loadFromFile(path: string) {
    let result = {};
    try {
      const jsonString = fs.readFileSync(path);
      result = JSON.parse(jsonString.toString());
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  public loadScheduler(): Scheduler {
    const str = this.parsedConfig.scheduler;
    if (typeof str === "string") {
      switch (str) {
        case "FCFS":
          return new FCFSScheduler();
      }
    }
    return new FCFSScheduler();
  }
  public getElevatorsCount(): number {
    const num = this.parsedConfig.elevators;
    if (typeof num === "number" && num > 0) return num;
    return 16;
  }
  public getMaxFloor(): number {
    const num = this.parsedConfig.maxFloor;
    if (typeof num === "number" && num > 0) return num;
    return 16;
  }
}
