import { run, createSitesEnv } from "./sites-env.mjs";

const { paths } = createSitesEnv();

console.log("[sites] running npm ci");
await run("npm", ["ci", "--cache", paths.npmCache], {
  env: createSitesEnv({
    NPM_CONFIG_MAXSOCKETS: "1",
    NPM_CONFIG_FETCH_RETRIES: "0",
    NPM_CONFIG_FETCH_TIMEOUT: "30000",
  }).env,
});
