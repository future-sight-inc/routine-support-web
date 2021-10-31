import { useEffect, useState } from "react";

import moment, { Moment } from "moment";
import { useForm } from "react-hook-form";

import { ActivityFormActions } from "./ActivityForm";
import { Activity } from "@routine-support/models";

export const useActivityFormComponent = (
  activity: Partial<Activity> | null,
  actions: ActivityFormActions
) => {
  const defaultValues = {
    date: moment(),
    start: moment(),
    end: moment().add(1, "hours"),
    ...activity,
  };

  const { control, handleSubmit, formState, watch, getValues, setValue } =
    useForm({
      defaultValues,
      // ! Баг с типизацией
    } as any);

  const [minStartTime, setMinStartTime] = useState<Moment | undefined>(
    moment()
  );
  useEffect(() => {
    if (activity?.start) {
      setMinStartTime(activity?.start);
    }
  }, [activity]);

  const [minEndTime, setMinEndTime] = useState<Moment | undefined>();
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      switch (name) {
        case "start":
          setMinEndTime(value.start);
          setValue("end", value.start);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = handleSubmit(async (values) => {
    if (values._id) {
      await actions.updateActivity(values as Activity);
    } else {
      await actions.createActivity(values as Activity);
    }

    actions.getWeek();
  });

  const onDelete = async () => {
    const id = getValues()._id;
    if (window.confirm("Confirm your action") && id) {
      await actions.deleteActivity(id);

      actions.getWeek();
    }
  };

  return {
    models: {
      control,
      minDate: moment(),
      minStartTime,
      minEndTime,
      isDirty: formState.isDirty,
    },
    operations: { handleSubmit: onSubmit, onDelete },
  };
};
