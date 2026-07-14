import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");

export function createSitesEnv(extra = {}) {
  const runtimeRoot = resolve(
    process.env.SITES_RUNTIME_ROOT ?? join(projectRoot, ".sites-runtime"),
  );

  const paths = {
    home: join(runtimeRoot, "home"),
    npmCache: join(runtimeRoot, "npm-cache"),
    xdgConfig: join(runtimeRoot, "xdg-config"),
    tmp: join(runtimeRoot, "tmp"),
    wranglerLogs: join(runtimeRoot, "wrangler", "logs"),
    miniflareRegistry: join(runtimeRoot, "wrangler", "registry"),
  };

  for (const path of Object.values(paths)) {
    mkdirSync(path, { recursive: true });
  }

  const env = {
    ...process.env,
    SITES_ENV_READY: "1",
    SITES_PROJECT_ROOT: projectRoot,
    HOME: paths.home,
    XDG_CONFIG_HOME: paths.xdgConfig,
    TMPDIR: paths.tmp,
    TEMP: paths.tmp,
    TMP: paths.tmp,
    WRANGLER_WRITE_LOGS: "false",
    WRANGLER_LOG_PATH: paths.wranglerLogs,
    MINIFLARE_REGISTRY_PATH: paths.miniflareRegistry,
    npm_config_cache: paths.npmCache,
    npm_config_audit: "false",
    npm_config_fund: "false",
    npm_config_update_notifier: "false",
    ...extra,
  };

  delete env.NPM_CONFIG_CACHE;
  delete env.npm_config_proxy;
  delete env.npm_config_http_proxy;
  delete env.npm_config_https_proxy;
  delete env.NPM_CONFIG_PROXY;
  delete env.NPM_CONFIG_HTTP_PROXY;
  delete env.NPM_CONFIG_HTTPS_PROXY;

  return { env, projectRoot, runtimeRoot, paths };
}

export function run(command, args = [], options = {}) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    env: options.env ?? createSitesEnv().env,
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  return new Promise((resolveRun, reject) => {
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolveRun();
        return;
      }
      reject(new Error(`${command} exited with ${signal ?? code}`));
    });
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const separator = process.argv.indexOf("--");
  const command = process.argv[separator + 1];
  const args = separator >= 0 ? process.argv.slice(separator + 2) : process.argv.slice(2);

  if (!command) {
    console.error("usage: node scripts/sites-env.mjs -- command [args...]");
    process.exit(64);
  }

  run(command, args).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
