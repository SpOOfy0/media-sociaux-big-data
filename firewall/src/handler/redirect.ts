import { RequestHandler } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import logger from "../libs/logger.js";

type Server = {
  host: string;
  port: number;
  weight: number;
};

const servers: Server[] = [
  {
    host: "localhost",
    port: 13000,
    weight: 1
  }
];

const proxyOptions: Options = {
  target: "",
  changeOrigin: true
};

const middlewares: Record<string, RequestHandler> = {};

let currentIndex = 0;

/**
 * Gets the right proxy for the given target.
 * @param target The target to forward to.
 * @returns The right proxy for the given target.
 */
function getRedirect(target: string): RequestHandler {
  if (middlewares[target] == undefined) {
    logger.info({
      message: `Created proxy for port ${target}.`,
      location: "Firewall.getRedirect"
    });

    middlewares[target] = createProxyMiddleware(proxyOptions);
  }

  logger.info({
    message: `Request forwarded to port ${target}.`,
    location: "Firewall.getRedirect"
  });

  return middlewares[target];
}

/**
 * Gets the server with less charge.
 * @returns The server with less charge.
 */
function getServer(): Server {
  currentIndex = (currentIndex + 1) % servers.length;

  return servers[currentIndex];
}

/**
 * Create the redirect middleware
 * @param key The key to append to each request.
 * @returns The redirect function.
 */
export function createRedirect(key: string): RequestHandler {
  /**
   * Redirects the Express request to the right server.
   * @param req The Express request
   * @param res The Express response
   */
  return (req, res) => {
    const server = getServer();
    proxyOptions.target = `http://${server.host}:${server.port}`;

    proxyOptions.on = {
      proxyReq: proxyReq => {
        proxyReq.setHeader("Authorization", `Bearer ${key}`);
      },
      proxyRes: proxyRes => {
        delete proxyRes.headers["Authorization"];
      }
    };
  
    getRedirect(proxyOptions.target)(req, res, () => {});
  } 
}