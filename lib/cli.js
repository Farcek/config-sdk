#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require('commander');
var path = require('path');
var pkg = require('../package.json');
var debug = require("debug");
var debugCli = debug("byteconfig-cli");
const index_1 = require("./index");
program
    .version(pkg.version);
// .option('-e, --env <env>', 'enviroment')
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook')
program
    .command('init')
    .description('byteconfig initlize. save to config cache file')
    .action((env, options) => {
    debug.enable('byteconfig*');
    index_1.configInit()
        .then((conf) => {
        debugCli("inited config: %O", conf);
    })
        .catch((err) => {
        debugCli("failed config: %O", err);
    });
});
program
    .command('show [sector]')
    .description('byteconfig show config from cache config')
    .action((sector, options) => {
    debug.enable('byteconfig*');
    try {
        let conf = index_1.config();
        if (sector in conf) {
            debugCli("inited config: %O", conf[sector]);
        }
        else {
            debugCli("inited config: %O", conf);
        }
    }
    catch (error) {
        debugCli("failed config: %O", error);
    }
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map