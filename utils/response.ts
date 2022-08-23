import { Context } from "koa";

function success(
  ctx: Context,
  data: any = [],
  msg = "success",
  code: number = 200
) {
  ctx.body = {
    code,
    msg,
    data,
  };
}
function error(
  ctx: Context,
  msg: string = "error",
  data: any = [],
  code: number = 400
) {
  ctx.body = {
    code,
    msg,
    data,
  };
}
export default { success, error };
