import { appendFileSync } from "fs";

type LoggerParameters = {
  message: string;
  location: string;
  error?: string;
};

const basePath = (import.meta.dirname ?? __dirname) + "/../../logs/";

/**
 * Writes the given log inside the corresponding log file.
 * @param log The log to write in the file.
 * @param type The type of log to write.
 */
function writeInFile(log: string, type: "info" | "warning" | "error") {
  const file = type == "error" ? "error.log" : "server.log";
  appendFileSync(basePath + file, log + "\n");
}

/**
 * Logs information into the console.
 * @param params The message and location of information.
 */
function info(params: LoggerParameters) {
  const date = (new Date()).toISOString();
  const tag = `\x1b[1m\x1b[96m[i]\x1b[0m  `;
  const log = `[${date}] ${tag}(${params.location}) ${params.message}`;
  console.log(log);
  writeInFile(`[${date}] [i] (${params.location}) ${params.message}`, "info");
}

/**
 * Logs warning into the console.
 * @param params The message and location or warning.
 */
function warn(params: LoggerParameters) {
  const date = (new Date()).toISOString();
  const tag = `\x1b[1m\x1b[93m[w]\x1b[0m  `;
  const log = `[${date}] ${tag}(${params.location}) ${params.message}`;
  console.warn(log);
  writeInFile(`[${date}] [w] (${params.location}) ${params.message}`, "warning");
}

/**
 * Logs error into the console.
 * @param params The message, location and reason of error.
 */
function error(params: LoggerParameters) {
  const date = (new Date()).toISOString();
  const tag = `\x1b[1m\x1b[91m[e]\x1b[0m  `;
  const log = `[${date}] ${tag}(${params.location}) ${params.message} ${params.error ?? ""}`;
  console.error(log);
  writeInFile(`[${date}] [e] (${params.location}) ${params.message} ${params.error ?? ""}`, "error");
}

export default {
  info,
  warn,
  error
};