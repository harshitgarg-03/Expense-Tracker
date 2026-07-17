import { proxy } from "./proxy";
import { mcpmiddleware } from "./mcp";

export const middlewares = [
  proxy,
  mcpmiddleware,
];