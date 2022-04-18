import { createClient } from "@routine-support/api-client";
import {
  createActivityAPI,
  createCoachAPI,
  createStudentAPI,
  createWeekAPI,
} from "@routine-support/domains";

const client = createClient("/api");

export const activityAPI = createActivityAPI(client);
export const studentAPI = createStudentAPI(client);
export const coachAPI = createCoachAPI(client);
export const weekAPI = createWeekAPI(client);
