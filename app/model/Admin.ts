import { Column, Model, Table } from "sequelize-typescript";
@Table
export default class Admin extends Model {
  @Column
  name!: string;
  @Column
  mobile!: string;
  @Column
  email!: string;
  @Column
  password!: string;
}
