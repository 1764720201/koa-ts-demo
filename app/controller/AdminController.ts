import { Rules } from "async-validator";
import { Context } from "koa";
import { URLSearchParams } from "url";
import paginate from "../../utils/paginate";
import response from "../../utils/response";
import AdminService from "../service/AdminService";
import validator from "../../utils/validator";
import { createHash } from "crypto";

class AdminController {
  async getAdminList(ctx: Context) {
    const usp = new URLSearchParams(ctx.querystring);
    let page = 1,
      limit = 10;
    if (usp.get("page") && !isNaN(Number(usp.get("page")))) {
      page = Number(usp.get("page"));
    }
    if (usp.get("limit") && !isNaN(Number(usp.get("limit")))) {
      limit = Number(usp.get("limit"));
    }
    const { rows, count } = await AdminService.getAdminListByPage(page, limit);
    response.success(ctx, paginate(rows, page, count, limit));
  }
  async addAdmin(ctx: Context) {
    const rules: Rules = {
      name: [
        {
          type: "string",
          required: true,
          message: "用户名不可以为空",
        },
      ],
      password: [
        {
          type: "string",
          required: true,
          message: "密码不可以为空",
        },
        {
          type: "string",
          min: 6,
          message: "密码长度不可以小于6位",
        },
      ],
    };
    interface IAdmin {
      id: number;
      name: string;
      password: string;
    }
    try {
      const { data, error } = await validator<IAdmin>(ctx, rules);
      if (error !== null) {
        return response.error(ctx, error);
      }
      const admin = await AdminService.getAdminByName(data.name);
      if (admin !== null) {
        return response.error(ctx, "管理员已经存在");
      }
      data.password = createHash("md5").update(data.password).digest("hex");
      const row = await AdminService.addAdmin(data);
      if (row.id > 0) {
        return response.success(ctx);
      }
      return response.error(ctx, "插入失败");
    } catch (error) {
      console.log(error);
    }
  }
}
export default new AdminController();
