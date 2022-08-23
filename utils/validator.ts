import Schema, { Rules, Values } from "async-validator";
import { Context } from "koa";

async function validator<T extends Values>(
  ctx: Context,
  rules: Rules,
  flag: boolean = false
): Promise<{ data: T; error: any | null }> {
  const validator = new Schema(rules);
  let data: any;
  switch (ctx.method) {
    case "GET":
      break;
    case "POST":
      data = getFormData(ctx);
      break;
    case "DELETE":
      break;
  }
  return await validator
    .validate(data)
    .then(() => {
      return {
        data: data as T,
        error: null,
      };
    })
    .catch((err) => {
      if (flag) {
        return {
          data: {} as T,
          error: err,
        };
      }
      return {
        data: {} as T,
        error: err.errors[0].message,
      };
    });
}
function getFormData(ctx: Context) {
  return ctx.request.body;
}
export default validator;
