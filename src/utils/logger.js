const NO_OP = (message, ...optionalParams) => {};
const LOG_LEVEL = { ERROR: "error", WARN: "warn", LOG: "log" };
/** Logger which outputs to the browser console */
export class ConsoleLogger {
  log;
  warn;
  error;
  group;
  groupEnd;
  groupCollapsed;

  constructor(options) {
    const { level } = options || {};

    this.group = console.group.bind(console);
    this.groupEnd = console.groupEnd.bind(console);
    this.groupCollapsed = console.groupCollapsed.bind(console);
    this.error = console.error.bind(console);

    if (level === LOG_LEVEL.ERROR) {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === LOG_LEVEL.WARN) {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console);
    this.render = console.log.bind(console, "component:");
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL.LOG });
