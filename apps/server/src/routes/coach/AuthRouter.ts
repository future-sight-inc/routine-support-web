import { Coach } from "@routine-support/domains";
import { SubmitErrorData } from "@routine-support/types";
import { Response, Router } from "express";
import { AuthNames } from "../../constants/AuthNames";
import { AuthController } from "../../controllers";
import { coachAuthorization } from "../../middleware/coachAuthorization";

export const authRouter = Router();

authRouter.post("/", async (req, res: Response<Coach | SubmitErrorData>) => {
  const { validationData, coach, cookie } = await AuthController.registerCoach(req.body);

  if (!validationData.isValid || !coach || !cookie) {
    return res.status(422).send(validationData);
  }

  return res.status(200).cookie(cookie.name, cookie.token).send(coach);
});

authRouter.post("/login", async (req, res: Response<Coach | SubmitErrorData>) => {
  const { validationData, coach, cookie } = await AuthController.loginCoach(req.body);

  console.log(validationData, coach, cookie)

  if (!validationData.isValid || !coach || !cookie) {
    return res.status(401).send({ error: "Invalid credentials", isValid: false });
  }

  return res.status(200).cookie(cookie.name, cookie.token).send(coach);
});

authRouter.get("/", coachAuthorization, (__, res: Response<Coach>) => {
  return res.status(200).send(res.locals[AuthNames.Coach]);
});

authRouter.delete("/", coachAuthorization, async (__, res: Response<Coach>) => {
  await AuthController.deleteCoach(res.locals.coach._id);

  return res
    .status(200)
    .clearCookie(`${AuthNames.Coach}_access_token`)
    .send(res.locals[AuthNames.Coach]);
});

authRouter.get("/logout", (__, res) => {
  return res.clearCookie(`${AuthNames.Coach}_access_token`).sendStatus(200);
});
