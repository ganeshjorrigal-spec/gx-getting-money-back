/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agent from "../agent.js";
import type * as agentData from "../agentData.js";
import type * as agentWrites from "../agentWrites.js";
import type * as cases from "../cases.js";
import type * as checkins from "../checkins.js";
import type * as crons from "../crons.js";
import type * as feedback from "../feedback.js";
import type * as files from "../files.js";
import type * as googleActions from "../googleActions.js";
import type * as googleConnect from "../googleConnect.js";
import type * as googleData from "../googleData.js";
import type * as http from "../http.js";
import type * as lib_access from "../lib/access.js";
import type * as lib_delete from "../lib/delete.js";
import type * as lib_ground from "../lib/ground.js";
import type * as lib_plan from "../lib/plan.js";
import type * as lib_prompts from "../lib/prompts.js";
import type * as lib_rate from "../lib/rate.js";
import type * as lib_read from "../lib/read.js";
import type * as m0Check from "../m0Check.js";
import type * as payments from "../payments.js";
import type * as qa from "../qa.js";
import type * as retention from "../retention.js";
import type * as waitlist from "../waitlist.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agent: typeof agent;
  agentData: typeof agentData;
  agentWrites: typeof agentWrites;
  cases: typeof cases;
  checkins: typeof checkins;
  crons: typeof crons;
  feedback: typeof feedback;
  files: typeof files;
  googleActions: typeof googleActions;
  googleConnect: typeof googleConnect;
  googleData: typeof googleData;
  http: typeof http;
  "lib/access": typeof lib_access;
  "lib/delete": typeof lib_delete;
  "lib/ground": typeof lib_ground;
  "lib/plan": typeof lib_plan;
  "lib/prompts": typeof lib_prompts;
  "lib/rate": typeof lib_rate;
  "lib/read": typeof lib_read;
  m0Check: typeof m0Check;
  payments: typeof payments;
  qa: typeof qa;
  retention: typeof retention;
  waitlist: typeof waitlist;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  staticHosting: import("@convex-dev/static-hosting/_generated/component.js").ComponentApi<"staticHosting">;
};
