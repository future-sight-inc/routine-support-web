import { createCoachUseStudent } from "@routine-support/domains";
import { coachStudentAPI } from "apps/mobile/src/services/ApiService";

export const useStudent = createCoachUseStudent({ studentApi: coachStudentAPI });