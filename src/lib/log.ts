/* eslint-disable no-console */
import { type ConsolaOptions, createConsola } from "consola";
import { createConsola as createBrowserConsola } from "consola/browser";

// import pc from "picocolors";

export const loggerOptions: Partial<ConsolaOptions> = {
  level: 4,
  //   reporters: [
  //     {
  //       log(logObj, ctx) {
  //         console.log("🚀", pc.green(JSON.stringify(logObj.message)));
  //       },
  //     },
  //   ],
};

export const logger =
  typeof window === "undefined"
    ? createConsola(loggerOptions)
    : createBrowserConsola(loggerOptions);
