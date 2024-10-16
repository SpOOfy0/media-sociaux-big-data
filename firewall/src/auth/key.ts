import { readFileSync, existsSync } from "fs";
import logger from "../libs/logger.js";

export namespace Auth {
  const keyPath: string = (import.meta.dirname ?? __dirname) + "/../../.key";

  /**
   * Emulates inner network through authorization key.
   * @returns The authorization key for inner network.
   */
  export function getKey(): string {
    if (!existsSync(keyPath)) {
      logger.error({
        message: "Key file does not exist. Please provide one.",
        location: "Auth.getKey"
      });
      return null;
    }

    return readFileSync(keyPath, "utf-8");
  }
}
