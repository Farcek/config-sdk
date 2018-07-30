const jwt = require("jsonwebtoken");
const debug = require("debug")('logger-sdk');
import * as http from './http';

export interface IConfigSDK {
    appid: number

    secretKey: string

    env?: string

    /**
     * Logger service base url
     * default : `http://config.byte.mn`
     */
    baseUri?: string

    request?: {
        /**
         * request timeout 
         * default : 5 sec
         */
        timeout?: number
    }
}
export interface IConfig {
    [key: string]: { [key: string]: any }
}
export class ConfigSDK {
    constructor(private options: IConfigSDK) { }

    private _inited = false;
    get inited() {
        return this._inited;
    }

    private _dta: any = null;
    get dta() {
        return this._dta || {};
    }

    get requestTimeout(): number {
        return (this.options && this.options.request && this.options.request.timeout || 5) * 1000;
    }

    get requestBaseuri(): string {
        return this.options && this.options.baseUri || "http://config.byte.mn";
    }
    get requestToken(): string {
        return token(this.options.appid, this.options.secretKey);
    }
    get configEnv(): string {
        return this.options && this.options.env || process.env["CONFIG_ENV"] || process.env["NODE_ENV"] || "prod";
    }

    async init() {

        let initUri = `${this.requestBaseuri}/env/${this.configEnv}`;
        debug(`config init uri : ${initUri}`);

        let dta = await http.get(initUri, {
            header: { authorization: this.requestToken },
            timeout: this.requestTimeout
        });

        this._inited = true;
        this._dta = dta;

        console.log(dta);
    }
}

function token(app: number, key: string) {
    let t = jwt.sign({
        a: app
    }, key);

    return t;
}

const $ = {
    ints: <any>null
}
export async function configInit(opt: IConfigSDK) {
    let c = $.ints = new ConfigSDK(opt);
    await c.init();
}



export function config(): IConfig {
    const conf: ConfigSDK = $.ints;

    if (conf && conf.inited) {
        return conf.dta;
    }

    throw new ReferenceError("config not inited");
}
