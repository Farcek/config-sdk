# Byte config SDK

byte system config SDK

##### install
``` 
npm i --save https://github.com/Farcek/config-sdk.git
```

use
``` typescript

// import
import { configInit, config } from "./index";

// init & config write cache file
await configInit();


// load config from memery or cachefile
let conf = config();

```

Cli
``` cli

> byteconfig init -- // configration
> byteconfig show -- all config show
> byteconfig show [sector] -- show sector only config

```

.byteconfigrc - in the file location. npm [rc](https://www.npmjs.com/package/rc) package for help

``` json

{

  "baseUri": "http://config.byte.mn",
  "appid": 0,
  "appsecret": "xxx",
  "env" : "production"
}

```