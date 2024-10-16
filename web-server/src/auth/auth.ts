import { readFileSync, existsSync } from "fs";
import logger from "../libs/logger.js";

export namespace Auth {
  const credentialFilePath: string = (import.meta.dirname ?? __dirname) + "/credentials.json";
  export const scopes: string[] = ["https://www.googleapis.com/auth/youtube.readonly"];

  export function getAPIKey(): string {
    if (!existsSync(credentialFilePath)) {
      logger.error({
        message: "API credentials file does not exist. Please provide one.",
        location: "Auth.getAPIKey"
      });
      return null;
    }

    const credentialsFile = readFileSync(credentialFilePath, "utf-8");
    const credentials = JSON.parse(credentialsFile);
    return credentials.api_key;
  }
}
