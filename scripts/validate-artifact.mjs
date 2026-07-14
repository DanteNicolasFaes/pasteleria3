import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createSitesEnv } from "./sites-env.mjs";

const { projectRoot } = createSitesEnv();
const workerPath = join(projectRoot, "dist", "server", "index.js");
const hostingPath = join(projectRoot, "dist", ".openai", "hosting.json");

async function requireFile(path, message) {
  try {
    await access(path);
  } catch {
    throw new Error(message);
  }
}

await requireFile(workerPath, "Missing Sites Worker entry: dist/server/index.js");
await requireFile(hostingPath, "Missing packaged Sites manifest: dist/.openai/hosting.json");
JSON.parse(await readFile(hostingPath, "utf8"));

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);

if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error(
    "dist/server/index.js must have an ESM default export with fetch(request, env, ctx)",
  );
}

console.log("Validated Sites artifact: ESM Worker default.fetch and hosting manifest are present.");
