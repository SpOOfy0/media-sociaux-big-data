import { RequestHandler } from "express";
import { readFileSync, existsSync } from "fs";
import logger from "./logger.js";

export namespace Auth {
  const keyPath: string = (import.meta.dirname ?? __dirname) + "/../../.key";

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

  export function createCheckAuth(): RequestHandler {
    const key = getKey();

    return (req, res, next) => {
      if (req.headers.authorization != `Bearer ${key}`) {
        logger.warn({
          message: `Attempted connexion on ${req.url} not through firewall.`,
          location: "check-auth"
        });
        res.status(404).send({ code: 404, error: "Not Found" });
      }

      next();
    }
  }
}
