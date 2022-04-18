import { RefObject, useEffect, useState } from "react";

import { TimeString } from "@routine-support/types";
import { getMinutes, parseTime, pxToNumber } from "@routine-support/utils";
import moment, { Moment } from "moment";

import { Theme } from "../../../../styled/theme";
import { WeekCalendarActions } from "./WeekCalendar";

export const useWeekCalendarComponent = (
  containerRef: RefObject<HTMLDivElement>,
  actions: WeekCalendarActions
) => {
  const [timelineTopOffset, setTimelineTopOffset] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkOffset = () => {
      const frame = containerRef?.current?.scrollHeight;
      const minutes = getMinutes(moment());
      const offsetTop = (minutes / (24 * 60)) * (frame || 0);

      if (!scrolled) {
        setTimelineTopOffset(offsetTop);
        containerRef?.current?.scrollTo({
          top: offsetTop - pxToNumber(Theme.size.cellHeight),
        });
        setScrolled(true);
      }
    };

    checkOffset();
    const timerId = setInterval(() => checkOffset(), 60 * 1000);

    return () => clearInterval(timerId);
  }, [containerRef]);

  const onCellClick = (time: TimeString, day: Moment) => {
    actions.openNewActivityModal({
      date: day,
      start: parseTime(time),
      end: parseTime(time).add(1, "hours"),
    });
  };

  return { models: { timelineTopOffset }, operations: { onCellClick } };
};
