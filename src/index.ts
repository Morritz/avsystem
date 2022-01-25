import * as Module from "./Elevator";

// Instantiate system, with configuration class.
const system = new Module.System.System(new Module.Config.Config());
// Set status to display each second.
setInterval(() => system.displayStatus(), 1000);
