import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.daily("delete old inactive cases and closed screenshots", { hourUTC: 19, minuteUTC: 0 }, internal.retention.run);
crons.interval("check for organiser replies", { minutes: 10 }, internal.googleActions.poll);
crons.interval("update the responses sheet", { minutes: 10 }, internal.responsesActions.syncAll);
crons.daily("expire Google case connections", { hourUTC: 19, minuteUTC: 10 }, internal.googleData.expireConnections);
crons.interval('update quiet open cases',{hours:1},internal.chase.quietUpdates,{});
export default crons;
