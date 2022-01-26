import * as Module from "./Elevator";

// Instantiate system, with configuration class.
const system = new Module.System.System(new Module.Config.Config());
// Set status to display each second.
setInterval(() => system.displayStatus(), 1000);
system.run();

// Simulate elevator call request

// system.call(23);
// system.call(0);
// system.call(1);
// system.call(-1); // wrong
// system.call(0);
// system.call(23); // wrong
// system.call(3);
// system.call(8);
// system.call(19); // wrong

// // we must check for duplicates
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(6);
// system.call(1);
// system.call(2);

// setTimeout(() => {
//   system.call(12);
// }, 2000);

// setTimeout(() => {
//   system.call(15);
// }, 3000);

// setTimeout(() => {
//   system.call(0);
// }, 4000);
