import {
  createMockActivitySchema,
  setActivityTime,
} from "@routine-support/test-utils";
import { validateActivity } from "./validateActivity";

describe("validateActivity", () => {
  it("Start time is greater then end time", () => {
    const activity = createMockActivitySchema();

    setActivityTime(
      {
        start: "11:00",
        end: "10:00",
      },
      activity
    );
    const validationData = validateActivity(activity);

    expect(validationData.isValid).toBeFalsy();
  });

  it("Start time is equals end time", () => {
    const activity = createMockActivitySchema();

    setActivityTime(
      {
        start: "10:00",
        end: "10:00",
      },
      activity
    );
    const validationData = validateActivity(activity);

    expect(validationData.isValid).toBeFalsy();
  });

  it("Start time is less then end time", () => {
    const activity = createMockActivitySchema();

    setActivityTime(
      {
        start: "10:00",
        end: "11:00",
      },
      activity
    );
    const validationData = validateActivity(activity);

    expect(validationData.isValid).toBeTruthy();
  });

  it("Start time is less then end time in minutes", () => {
    const activity = createMockActivitySchema();

    setActivityTime(
      {
        start: "10:10",
        end: "10:11",
      },
      activity
    );
    const validationData = validateActivity(activity);

    expect(validationData.isValid).toBeTruthy();
  });

  it("Start time is greater then end time in minutes", () => {
    const activity = createMockActivitySchema();

    setActivityTime(
      {
        start: "11:11",
        end: "11:10",
      },
      activity
    );
    const validationData = validateActivity(activity);

    expect(validationData.isValid).toBeFalsy();
  });
});