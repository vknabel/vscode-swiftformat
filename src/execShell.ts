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
    const result = spawnSync(file, args ?? [], {
      ...options,
      encoding: "utf8",
      shell: true,
    });
    if (result.error) {
      throw result.error;
    }
    return result.stdout;
  } else {
    return execFileSync(file, args, options);
  }
}
