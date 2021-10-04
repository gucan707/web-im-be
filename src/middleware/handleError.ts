import { IMiddleware } from "koa-router";

export const handleError: IMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    try {
      const msg = JSON.parse(err.message);
      ctx.body = {
        ...msg,
        data: null,
      };
    } catch {
      ctx.body = {
        status: 500,
        msg: err.message,
        data: null,
      };
    } finally {
      console.error(err);
    }
  } finally {
    if (ctx.status === 301 || ctx.status === 302) void 0;
    else ctx.status = 200;
  }
};

export function createError({ status, msg }: { status: number; msg: string }) {
  throw new Error(
    JSON.stringify({
      status,
      msg,
    })
  );
}
