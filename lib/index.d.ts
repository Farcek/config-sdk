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
export declare const byteconfig: {
    rcConfig: IRcConfig;
    readonly env: string;
    readonly token: any;
    readonly cachedir: any;
    readonly configfile: string;
    dta: any;
    readonly config: any;
};
export declare function configInit(): Promise<any>;
export declare function config(): any;
export declare function configFromCache(): any;
export {};
