import { connect, connection } from "mongoose";

export function setupMongo() {
  const DB_URL = "mongodb://localhost:27017/web-im";
  connect(DB_URL);

  return new Promise<void>((resolve, reject) => {
    connection.on("connected", () => {
      console.log("connected to mongodb");
      resolve();
    });
    connection.on("error", (error) => {
      console.log("mongodb数据库连接失败", error);
      reject();
    });
  });
}
