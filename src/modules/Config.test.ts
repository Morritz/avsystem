import { Config } from "./Config";
import { FCFSScheduler } from "./Scheduler";

import fs from "fs";

jest.mock("fs");

describe("check if default values are set on wrong config values", () => {
  it.each([
    `{
        "scheduler": "kmgfsgnsoingos",
        "elevators": "test",
        "maxFloor": -1
      }
      `,
    `{
        "scheduler": 1,
        "elevators": "test",
        "maxFloor": "123"
      }
      `,
  ])("when the input is '%s'", (configString: string) => {
    (<jest.Mock>fs.readFileSync).mockReturnValue(configString);

    const cfg = new Config("./example.json");
    console.log(cfg);

    const scheduler = cfg.loadScheduler();
    const elevatorsCount = cfg.getElevatorsCount();
    const maxFloor = cfg.getMaxFloor();

    expect(scheduler).toBeInstanceOf(FCFSScheduler);
    expect(elevatorsCount).toBe(16);
    expect(maxFloor).toBe(16);
  });
});
