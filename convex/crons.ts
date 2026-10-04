import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.daily("delete old inactive cases and closed screenshots", { hourUTC: 19, minuteUTC: 0 }, internal.retention.run);
export default crons;
