import logger from "../libs/logger.js";

export namespace Auth {
  export const scopes: string[] = ["https://www.googleapis.com/auth/youtube.readonly"];

  export function getAPIKey(): string {
    if (process.env.YOUTUBE_API_KEY == undefined) {
      logger.error({
        message: "Youtube API key not provided in .env. Please provide one.",
        location: "Auth.getAPIKey"
      });
      return null;
    }

    return process.env.YOUTUBE_API_KEY;
  }
}
