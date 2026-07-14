import { run } from "./sites-env.mjs";

console.log("Running vinext build...");
await run("vinext", ["build"]);
await import("./validate-artifact.mjs");
