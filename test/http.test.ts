import { Server } from "http";
import request from "supertest";
import run from "../app";
describe("http", () => {
  let server: Server;
  beforeAll(() => {
    server = run(3003);
  });
  it("GET/admin", () => {
    return request(server)
      .get("/admin")
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(8);
        // expect(response.body).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      });
  });
  afterAll(async () => {
    server.close();
  });
});
