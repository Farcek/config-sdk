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
const debug = require("debug")('logger-sdk');
const http = __importStar(require("./http"));
class ConfigSDK {
    constructor(options) {
        this.options = options;
        this._inited = false;
        this._dta = null;
    }
    get inited() {
        return this._inited;
    }
    get dta() {
        return this._dta || {};
    }
    get requestTimeout() {
        return (this.options && this.options.request && this.options.request.timeout || 5) * 1000;
    }
    get requestBaseuri() {
        return this.options && this.options.baseUri || "http://config.byte.mn";
    }
    get requestToken() {
        return token(this.options.appid, this.options.secretKey);
    }
    get configEnv() {
        return this.options && this.options.env || process.env["CONFIG_ENV"] || process.env["NODE_ENV"] || "prod";
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let initUri = `${this.requestBaseuri}/env/${this.configEnv}`;
            debug(`config init uri : ${initUri}`);
            let dta = yield http.get(initUri, {
                header: { authorization: this.requestToken },
                timeout: this.requestTimeout
            });
            this._inited = true;
            this._dta = dta;
            console.log(dta);
        });
    }
}
exports.ConfigSDK = ConfigSDK;
function token(app, key) {
    let t = jwt.sign({
        a: app
    }, key);
    return t;
}
const $ = {
    ints: null
};
function configInit(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        let c = $.ints = new ConfigSDK(opt);
        yield c.init();
    });
}
exports.configInit = configInit;
function config() {
    const conf = $.ints;
    if (conf && conf.inited) {
        return conf.dta;
    }
    throw new ReferenceError("config not inited");
}
exports.config = config;
//# sourceMappingURL=index.js.map