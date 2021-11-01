import { Activity, ActivityDto } from "./types";
import {
  stringifyTime,
  stringifyDate,
  parseDate,
  parseTime,
} from "@routine-support/utils";

export const formatActivity = (activity: Activity): ActivityDto => {
  return {
    ...activity,
    date: stringifyDate(activity.date),
    start: stringifyTime(activity.start),
    end: stringifyTime(activity.end),
  };
};

export const formatActivityDto = (activityDto: ActivityDto): Activity => {
  return {
    ...activityDto,
    date: parseDate(activityDto.date),
    start: parseTime(activityDto.start, activityDto.date),
    end: parseTime(activityDto.end, activityDto.date),
  };
};
