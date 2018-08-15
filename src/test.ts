import { configInit, config } from "./index";

interface ICo {
    name : boolean;
    db:any;
}

async function test() {

    // await configInit();

    let conf:ICo = config() as ICo;
    console.log(conf)
    return conf.db;
}

test().catch((e) => {
    console.log("error:", e);
}).then(console.log);