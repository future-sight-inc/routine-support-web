import React from "react";

import { Week } from "features/week/types";
import { isToday } from "utils/isToday";

import * as S from "./styled";

interface WeekRangeProps {
  week: Week | null;
}

export const WeekRange: React.FC<WeekRangeProps> = ({ week }) => {
  return (
    <S.Wrapper>
      {week?.days.map((day) => (
        <S.Day today={isToday(day.date)}>
          <S.DayName>{day.date.format("dd")},</S.DayName>
          <S.Date>{day.date.format("DD MMM")}</S.Date>
        </S.Day>
      ))}
    </S.Wrapper>
  );
};
