type LoggerParameters = {
  message: string;
  location: string;
  error?: string;
}

/**
 * Logs information into the console.
 * @param params The message and location of information.
 */
function info(params: LoggerParameters) {
  const tag = `\x1b[1m\x1b[96m[i]\x1b[0m  `;
  console.log(`${tag}(${params.location}) ${params.message}`);
}

/**
 * Logs warning into the console.
 * @param params The message and location or warning.
 */
function warn(params: LoggerParameters) {
  const tag = `\x1b[1m\x1b[93m[w]\x1b[0m  `;
  console.log(`${tag}(${params.location}) ${params.message}`);
}

/**
 * Logs error into the console.
 * @param params The message, location and reason of error.
 */
function error(params: LoggerParameters) {
  const tag = `\x1b[1m\x1b[91m[e]\x1b[0m  `;
  console.log(`${tag}(${params.location}) ${params.message} ${params.error}`);
}

export default {
  info,
  warn,
  error
}