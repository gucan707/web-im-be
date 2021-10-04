import { createError } from "../middleware/handleError";

type Validator = (value: string) => Promise<string | undefined>;

export const useValidator = async (validator: Validator, value: string) => {
  const res = await validator(value);
  if (res) {
    createError({ status: 401, msg: res });
  }
};

export const usernameValidator: Validator = async (username) => {
  if (typeof username !== "string") return "用户名不合法";
  if (!/^[_a-zA-Z0-9]+$/.test(username)) return "用户名包含非法字符";
  if (username.length < 3 || username.length > 10)
    return "用户名需要在3~10个字之间";
};

export const nicknameValidator: Validator = async (nickname) => {
  if (typeof nickname !== "string") return "昵称不合法";
  if (nickname.length < 3 || nickname.length > 10)
    return "昵称需要在3~10个字之间";
};

export const passwordValidator: Validator = async (password) => {
  if (typeof password !== "string") return "密码不合法";
  if (password.length !== 64) return "密码不合法";
};
