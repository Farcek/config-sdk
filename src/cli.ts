#!/usr/bin/env node


var program = require('commander');
var path = require('path');
var pkg = require('../package.json');
var debug = require("debug");
var debugCli = debug("byteconfig-cli");


import { config, configInit } from "./index";



program
    .version(pkg.version)
// .option('-e, --env <env>', 'enviroment')
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook')



program
    .command('init')
    .description('byteconfig initlize. save to config cache file')
    .action((env: string, options: any) => {
        debug.enable('byteconfig*');
        configInit()
            .then((conf) => {
                debugCli("inited config: %O", conf);
            })
            .catch((err) => {
                debugCli("failed config: %O", err);
            })
    });
program
    .command('show [sector]')
    .description('byteconfig show config from cache config')
    
    .action((sector: string, options: any) => {
        
        debug.enable('byteconfig*');
        try {
            let conf = config();

            if(sector in conf) {
                debugCli("inited config: %O", conf[sector]);
            }
            else {
                debugCli("inited config: %O", conf);
            }

            
        } catch (error) {
            debugCli("failed config: %O", error);
        }
    });


program.parse(process.argv);