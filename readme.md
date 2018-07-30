# Byte config SDK

byte system config SDK

##### install
``` 
npm i --save https://github.com/Farcek/config-sdk.git
```

use
``` typescript

// initlazation
import { configInit, config } from "./index";

// init
await configInit({
    baseUri: "http://config.byte.mn", 
    appid: 3,
    env : "prod", 
    secretKey: "12345678"
});


// uses
let conf = config();

// user
// config.db.user
// config.db.pass


```