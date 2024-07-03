import {
  execFileSync,
  ExecFileSyncOptionsWithStringEncoding,
  spawnSync,
} from "child_process";
import * as os from "os";

export function execShellSync(
  file: string,
  args: ReadonlyArray<string>,
  options: ExecFileSyncOptionsWithStringEncoding,
): string {
  if (os.platform() === "win32") {
    const result = spawnSync(quotePath(file), args ?? [], {
      ...options,
      encoding: "utf8",
      shell: true,
    });
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`${file} failed with exit code ${result.status}.`);
    }
    return result.stdout;
  } else {
    return execFileSync(file, args, options);
  }
}

function quotePath(path: string): string {
  if (path.startsWith('"') && path.endsWith('"')) {
    return path;
  } else {
    return `"${path}"`;
  }
}
