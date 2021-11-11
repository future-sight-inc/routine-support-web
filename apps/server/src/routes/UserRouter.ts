import { UserModel } from "@routine-support/models";
import { Router } from "express";
import { authorization } from "../middleware/authorization";
import { getAuthCookie } from "../utils/getAuthCookie";

export const userRouter = Router();

userRouter.post("/", async (req, res) => {
  UserModel.create(req.body, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    const cookie = getAuthCookie(result);
    return res.status(200).cookie(cookie.name, cookie.token).send(result);
  });
});

userRouter.post("/login", async (req, res) => {
  UserModel.findOne(req.body, (err, result) => {
    if (err || !result) {
      return res.status(401).send(err);
    }

    console.log(req.hostname, req.get("port"));

    const cookie = getAuthCookie(result);
    return res
      .status(200)
      .cookie(cookie.name, cookie.token, {
        domain: req.hostname + ":4200",
        sameSite: "none",
        secure: true,
      })
      .send(result);
  });
});

userRouter.get("/", authorization, (req, res) => {
  return res.status(200).send(res.locals.user);
});

userRouter.get("/logout", (__, res) => {
  return res.clearCookie("access_token").sendStatus(200);
});
