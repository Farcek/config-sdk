import { configInit, config } from "./index";

async function test() {

    await configInit({
        baseUri: "http://localhost:5010",
        appid: 3,
        env : "prod",
        secretKey: "12345678"
    });

    let conf = config();
}

test().catch((e) => {
    console.log("error:", e);
}).then(console.log);