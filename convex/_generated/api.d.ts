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
import type * as annualPayments from "../annualPayments.js";
import type * as callActions from "../callActions.js";
import type * as callQa from "../callQa.js";
import type * as calls from "../calls.js";
import type * as cases from "../cases.js";
import type * as chase from "../chase.js";
import type * as chaseActions from "../chaseActions.js";
import type * as chaseDemo from "../chaseDemo.js";
import type * as checkins from "../checkins.js";
import type * as checkout from "../checkout.js";
import type * as checkoutData from "../checkoutData.js";
import type * as crons from "../crons.js";
import type * as demo from "../demo.js";
import type * as demoActions from "../demoActions.js";
import type * as demoEmail from "../demoEmail.js";
import type * as demoEmailActions from "../demoEmailActions.js";
import type * as feedback from "../feedback.js";
import type * as files from "../files.js";
import type * as flightAgent from "../flightAgent.js";
import type * as flights from "../flights.js";
import type * as googleActions from "../googleActions.js";
import type * as googleConnect from "../googleConnect.js";
import type * as googleData from "../googleData.js";
import type * as http from "../http.js";
import type * as lib_access from "../lib/access.js";
import type * as lib_authority_font from "../lib/authority_font.js";
import type * as lib_authority_letter from "../lib/authority_letter.js";
import type * as lib_delete from "../lib/delete.js";
import type * as lib_demo_intake from "../lib/demo_intake.js";
import type * as lib_draft from "../lib/draft.js";
import type * as lib_ground from "../lib/ground.js";
import type * as lib_plan from "../lib/plan.js";
import type * as lib_prompts from "../lib/prompts.js";
import type * as lib_rate from "../lib/rate.js";
import type * as lib_read from "../lib/read.js";
import type * as lib_trial from "../lib/trial.js";
import type * as m0Check from "../m0Check.js";
import type * as payments from "../payments.js";
import type * as qa from "../qa.js";
import type * as qaTrial from "../qaTrial.js";
import type * as responsesActions from "../responsesActions.js";
import type * as responsesData from "../responsesData.js";
import type * as retention from "../retention.js";
import type * as site from "../site.js";
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
  annualPayments: typeof annualPayments;
  callActions: typeof callActions;
  callQa: typeof callQa;
  calls: typeof calls;
  cases: typeof cases;
  chase: typeof chase;
  chaseActions: typeof chaseActions;
  chaseDemo: typeof chaseDemo;
  checkins: typeof checkins;
  checkout: typeof checkout;
  checkoutData: typeof checkoutData;
  crons: typeof crons;
  demo: typeof demo;
  demoActions: typeof demoActions;
  demoEmail: typeof demoEmail;
  demoEmailActions: typeof demoEmailActions;
  feedback: typeof feedback;
  files: typeof files;
  flightAgent: typeof flightAgent;
  flights: typeof flights;
  googleActions: typeof googleActions;
  googleConnect: typeof googleConnect;
  googleData: typeof googleData;
  http: typeof http;
  "lib/access": typeof lib_access;
  "lib/authority_font": typeof lib_authority_font;
  "lib/authority_letter": typeof lib_authority_letter;
  "lib/delete": typeof lib_delete;
  "lib/demo_intake": typeof lib_demo_intake;
  "lib/draft": typeof lib_draft;
  "lib/ground": typeof lib_ground;
  "lib/plan": typeof lib_plan;
  "lib/prompts": typeof lib_prompts;
  "lib/rate": typeof lib_rate;
  "lib/read": typeof lib_read;
  "lib/trial": typeof lib_trial;
  m0Check: typeof m0Check;
  payments: typeof payments;
  qa: typeof qa;
  qaTrial: typeof qaTrial;
  responsesActions: typeof responsesActions;
  responsesData: typeof responsesData;
  retention: typeof retention;
  site: typeof site;
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
