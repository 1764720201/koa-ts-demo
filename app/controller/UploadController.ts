import { Context } from "koa";
import fs from "fs";
import response from "../../utils/response";

class UploadController {
  index(ctx: Context) {}
  upload = (ctx: Context) => {
    const file = ctx.request.files?.file;
    if (file) {
      //@ts-ignore
      const fileType = file.type;
      const typeSet = new Set([
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/png",
      ]);
      if (!typeSet.has(fileType)) {
        return response.error(ctx, "非法的文件上传");
      }
      //@ts-ignore
      const reader = fs.createReadStream(file.path);
      //@ts-ignore
      const ext = path.extname(file.name);
      const filePath = `upload/${this.randomStr(32)}${ext}`;
      //@ts-ignore
      const writer = fs.createWriteStream(`statics/${filePath}`);
      reader.pipe(writer);
      response.success(ctx, { file: filePath });
    } else {
      response.error(ctx, "文件不可以为空");
    }
  };
  randomStr(length: number): string {
    const seeder =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";
    let randomStr = "";
    for (let i = 0; i < length; i++) {
      randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
    }
    return randomStr;
  }
}
export default new UploadController();
