import * as os from "os";
import * as path from "path";

export function absolutePath(userDefinedPath: string) {
  return userDefinedPath.includes("~")
    ? path.normalize(userDefinedPath.replace(/^~/, os.homedir() + "/"))
    : userDefinedPath;
}
