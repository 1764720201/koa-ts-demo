import KoaRouter from "koa-router";
import AdminController from "../controller/AdminController";
import IndexController from "../controller/IndexController";
import LoginController from "../controller/LoginController";
import UploadController from "../controller/UploadController";
import AuthMiddleware from "../middleware/AuthMiddleware";
const router = new KoaRouter({ prefix: "/admin" });
router.get("/", IndexController.index);
router.post("/register", AdminController.addAdmin);
router.post("/login", LoginController.index);
router.get("/list", AdminController.getAdminList);
router.post("/upload", UploadController.upload);
router.use(AuthMiddleware);

export default router;
