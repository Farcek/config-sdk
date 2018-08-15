"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const rc = require("rc");
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const debug = require("debug")('byteconfig');
const http = __importStar(require("./http"));
function rcConfig() {
    let conf = rc('byteconfig', {
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
exports.byteconfig = {
    rcConfig: rcConfig(),
    get env() {
        return process.env["BYTECONFIG_ENV"] || process.env["NODE_ENV"] || exports.byteconfig.rcConfig.env || "production";
    },
    get token() {
        let t = jwt.sign({
            a: exports.byteconfig.rcConfig.appid
        }, exports.byteconfig.rcConfig.appsecret);
        return t;
    },
    get cachedir() {
        return path.join(process.cwd(), exports.byteconfig.rcConfig.cachedir);
    },
    get configfile() {
        return `.byteconfig-${exports.byteconfig.rcConfig.appid}`;
    },
    dta: null,
    get config() {
        return exports.byteconfig.dta || {};
    }
};
function configInit() {
    return __awaiter(this, void 0, void 0, function* () {
        let env = exports.byteconfig.env;
        let initUri = `${exports.byteconfig.rcConfig.baseUri}/env/${env}`;
        debug(`config init env : ${env}`);
        debug(`config init uri : ${initUri}`);
        exports.byteconfig.dta = yield http.get(initUri, {
            header: { authorization: exports.byteconfig.token },
            timeout: 30 * 1000
        });
        let cachedir = exports.byteconfig.cachedir;
        let filepath = path.join(exports.byteconfig.cachedir, exports.byteconfig.configfile);
        let jsonstring = JSON.stringify(exports.byteconfig.dta);
        mkdirp.sync(cachedir);
        fs.writeFileSync(filepath, jsonstring, 'utf8');
        debug(`config write cache dir: ${cachedir}`);
        debug(`config write file: ${filepath}`);
        return exports.byteconfig.dta;
    });
}
exports.configInit = configInit;
function config() {
    if (exports.byteconfig.dta)
        return exports.byteconfig.dta;
    return configFromCache();
}
exports.config = config;
function configFromCache() {
    let filepath = path.join(exports.byteconfig.cachedir, exports.byteconfig.configfile);
    if (fs.existsSync(filepath)) {
        debug(`config read cache : ${filepath}`);
        var obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return obj;
    }
    debug(`config not found cache : ${filepath}`);
    throw new Error("not found cache file");
}
exports.configFromCache = configFromCache;
//# sourceMappingURL=index.js.map