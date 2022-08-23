import { accessLogger } from "./../logger/index";
import { Context, Next } from "koa";

function AccessLogMiddleware(ctx: Context, next: Next) {
  const logStr = `path:${ctx.path}|method:${ctx.method}|ua:${ctx.header["user-agent"]}`;
  accessLogger.info(logStr);
  return next();
}
export default AccessLogMiddleware;
