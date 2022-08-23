import Admin from "../model/Admin";

class AdminService {
  getAdminById(adminId: number) {
    return Admin.findByPk(adminId);
  }
  getAdminListByPage(page: number, limit: number = 10) {
    return Admin.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
  }
  getAdminByName(name: string) {
    return Admin.findOne({
      where: {
        name,
      },
    });
  }
  addAdmin(admin: any) {
    return Admin.create(admin);
  }
}
export default new AdminService();
