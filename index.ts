import run from "./app";
import config from "./app/config";
run(config.server.port || "4000");
console.log(`http://localhost:${config.server.port}`);
