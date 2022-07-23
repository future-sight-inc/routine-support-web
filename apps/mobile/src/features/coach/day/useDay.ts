import { useEffect, useState } from "react";

import { coachDayActions, createDayFromSchema } from "@routine-support/domains";
import { stringifyDate } from "@routine-support/utils";
import moment from "moment";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../app/hooks";
import { coachDayAPI } from "../../../services/ApiService";

export const useDay = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { day } = useAppSelector((state) => state.coachDay);

  useEffect(() => {
    getDay();
  }, []);

  const getDay = async (config?: { silent: boolean }) => {
    try {
      !config?.silent && setLoading(true);

      const day = await coachDayAPI.getDay(stringifyDate(moment()));

      dispatch(coachDayActions.setDay(day));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    models: { loading, day: day ? createDayFromSchema(day) : null },
    operations: { getDay },
  };
};