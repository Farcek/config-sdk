const jwt = require("jsonwebtoken");
const rc = require("rc");
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const debug = require("debug")('byteconfig');
import * as http from './http';


interface IRcConfig {
    appid: number;
    appsecret: string;

    /**
     * config cache dir
     */
    cachedir: string;

    /**
     * byte config service base url
     * default : `http://config.byte.mn`
     */
    baseUri: string;

    env: string;
}

function rcConfig() {
    let conf: IRcConfig = rc('byteconfig', {
        appid: 0,
        appsecret: "",
        cachedir: ".config",
        baseUri: "http://config.byte.mn",
        env: "production"
    });

    if (!conf.appid) {
        throw new Error("not defined appid the .byteconfigrc");
    }
    if (!conf.appsecret) {
        throw new Error("not defined appsecret the .byteconfigrc");
    }

    return conf;
}

export const byteconfig = {
    rcConfig: rcConfig(),
    get env() {
        return process.env["BYTECONFIG_ENV"] || process.env["NODE_ENV"] || byteconfig.rcConfig.env || "production";
    },
    get token() {
        let t = jwt.sign({
            a: byteconfig.rcConfig.appid
        }, byteconfig.rcConfig.appsecret);
        return t;
    },
    get cachedir() {
        return path.join(process.cwd(), byteconfig.rcConfig.cachedir);
    },
    get configfile() {
        return `.byteconfig-${byteconfig.rcConfig.appid}`;
    },
    dta: null as any,

    get config() {
        return byteconfig.dta || {};
    }
}

export async function configInit() {
    let env = byteconfig.env;
    let initUri = `${byteconfig.rcConfig.baseUri}/env/${env}`;

    debug(`config init env : ${env}`);
    debug(`config init uri : ${initUri}`);

    byteconfig.dta = await http.get(initUri, {
        header: { authorization: byteconfig.token },
        timeout: 30 * 1000
    });


    let cachedir = byteconfig.cachedir;
    let filepath = path.join(byteconfig.cachedir, byteconfig.configfile);
    let jsonstring = JSON.stringify(byteconfig.dta);

    mkdirp.sync(cachedir);

    fs.writeFileSync(filepath, jsonstring, 'utf8');

    debug(`config write cache dir: ${cachedir}`);
    debug(`config write file: ${filepath}`);

    return byteconfig.dta;
}

export function config() {
    if (byteconfig.dta) return byteconfig.dta;

    return configFromCache();
}

export function configFromCache() {

    let filepath = path.join(byteconfig.cachedir, byteconfig.configfile);
    if (fs.existsSync(filepath)) {
        debug(`config read cache : ${filepath}`);
        var obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return obj;
    }

    debug(`config not found cache : ${filepath}`);
    throw new Error("not found cache file");
}
