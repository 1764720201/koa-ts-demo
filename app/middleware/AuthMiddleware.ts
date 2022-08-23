import { Context, Next } from "koa";
import { verify } from "../../utils/auth";

function AuthMiddleware(ctx: Context, next: Next) {
  const token = ctx.header["authorization"];
  if (token !== undefined && token !== "") {
    const { error } = verify(token);
    if (error !== null) {
      ctx.body = {
        msg: error.message,
        code: 400,
      };
    } else {
      return next();
    }
  }
  ctx.body = {
    msg: "authorization不可为空",
    code: 400,
  };
  return;
}

export default AuthMiddleware;
