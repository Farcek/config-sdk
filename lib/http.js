"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
function get(uri, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            request({
                uri,
                method: 'GET',
                headers: options.header || {},
                json: true,
                timeout: options.timeout * 1000
            }, (err, response, body) => {
                if (err) {
                    return reject(err);
                }
                if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                    return resolve(body);
                }
                reject(body);
            });
        });
    });
}
exports.get = get;
function post(uri, options, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request({
                uri,
                method: 'POST',
                headers: options.header || {},
                json: true,
                timeout: options.timeout * 1000,
                body: params
            }, (err, response, body) => {
                if (err) {
                    return reject(err);
                }
                if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                    return resolve(body);
                }
                reject(body);
            });
        });
    });
}
exports.post = post;
function put(uri, options, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request({
                uri,
                method: 'PUT',
                headers: options.header || {},
                json: true,
                timeout: options.timeout * 1000,
                body: params,
            }, (err, response, body) => {
                if (err) {
                    return reject(err);
                }
                if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                    return resolve(body);
                }
                reject(body);
            });
        });
    });
}
exports.put = put;
//# sourceMappingURL=http.js.map