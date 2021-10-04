import { IMiddleware } from "koa-router";
import { User, UserDef } from "../../model/mongoose/user";
import {
  nicknameValidator,
  usernameValidator,
  passwordValidator,
  useValidator,
} from "../../utils/validators";

export const createUser: IMiddleware = async (ctx) => {
  const req = ctx.request.body as Pick<
    UserDef,
    "username" | "nickname" | "password"
  >;
  const { nickname, password, username } = req;

  await useValidator(usernameValidator, username);
  await useValidator(nicknameValidator, nickname);
  await useValidator(passwordValidator, password);

  const user = new User(req);
  await user.save();

  const ret = {
    status: 200,
    msg: "ok",
    data: { id: user.id },
  };

  ctx.body = ret;
};
