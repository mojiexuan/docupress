#!/usr/bin/env node

import { build, dev, preview } from ".";
import { getErrorMessage } from "./utils/error.utils";

try {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case "build":
      build(args[0] || "");
      break;
    case "dev":
      dev(args[0] || "");
      break;
    case "preview":
      preview(args[0] || "");
      break;
    default:
      console.log("Usage: docupress <build|dev|preview> [dir]");
  }
} catch (error) {
  console.error(`Program exception:`, getErrorMessage(error));
}
