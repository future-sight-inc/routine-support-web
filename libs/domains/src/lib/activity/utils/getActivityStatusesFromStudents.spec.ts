import {
  addStudentToActivity,
  createMockActivity,
  createMockStudent,
} from "@routine-support/test-utils";
import { stringifyDate } from "@routine-support/utils";
import { confirmStudentActivity } from "./confirmStudentActivity";
import { getActivityStatusesFromStudents } from "./getActivityStatusesFromStudents";

describe("getActivityStatusesFromStudents", () => {
  it("One student pending", () => {
    const activity = createMockActivity();
    const student = createMockStudent();

    addStudentToActivity(activity, student);

    const { assignedStudents, pendingStudents, confirmedStudents } =
      getActivityStatusesFromStudents(activity, [student]);

    expect(assignedStudents).toStrictEqual([student]);
    expect(pendingStudents).toStrictEqual([student]);
    expect(confirmedStudents).toStrictEqual([]);
  });

  it("Two students pending", () => {
    const activity = createMockActivity();
    const student1 = createMockStudent();
    const student2 = createMockStudent();

    addStudentToActivity(activity, student1);
    addStudentToActivity(activity, student2);

    const { assignedStudents, pendingStudents, confirmedStudents } =
      getActivityStatusesFromStudents(activity, [student1, student2]);

    expect(assignedStudents).toStrictEqual([student1, student2]);
    expect(pendingStudents).toStrictEqual([student1, student2]);
    expect(confirmedStudents).toStrictEqual([]);
  });

  it("One student pending, one student confirmed", () => {
    const activity = createMockActivity();
    const student1 = createMockStudent();
    const student2 = createMockStudent();

    addStudentToActivity(activity, student1);
    addStudentToActivity(activity, student2);

    confirmStudentActivity({
      student: student1,
      activity,
      confirmationDate: stringifyDate(activity.date),
    });

    const { assignedStudents, pendingStudents, confirmedStudents } =
      getActivityStatusesFromStudents(activity, [student1, student2]);

    expect(assignedStudents).toStrictEqual([student1, student2]);
    expect(pendingStudents).toStrictEqual([student2]);
    expect(confirmedStudents).toStrictEqual([student1]);
  });

  it("One student confirmed", () => {
    const activity = createMockActivity();
    const student = createMockStudent();

    addStudentToActivity(activity, student);

    confirmStudentActivity({
      student,
      activity,
      confirmationDate: stringifyDate(activity.date),
    });

    const { assignedStudents, pendingStudents, confirmedStudents } =
      getActivityStatusesFromStudents(activity, [student]);

    expect(assignedStudents).toStrictEqual([student]);
    expect(pendingStudents).toStrictEqual([]);
    expect(confirmedStudents).toStrictEqual([student]);
  });

  it("Two students confirmed", () => {
    const activity = createMockActivity();
    const student1 = createMockStudent();
    const student2 = createMockStudent();

    addStudentToActivity(activity, student1);
    addStudentToActivity(activity, student2);

    confirmStudentActivity({
      student: student1,
      activity,
      confirmationDate: stringifyDate(activity.date),
    });
    confirmStudentActivity({
      student: student2,
      activity,
      confirmationDate: stringifyDate(activity.date),
    });

    const { assignedStudents, pendingStudents, confirmedStudents } =
      getActivityStatusesFromStudents(activity, [student1, student2]);

    expect(assignedStudents).toStrictEqual([student1, student2]);
    expect(pendingStudents).toStrictEqual([]);
    expect(confirmedStudents).toStrictEqual([student1, student2]);
  });
});
