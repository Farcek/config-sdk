export interface IConfigSDK {
    appid: number;
    secretKey: string;
    env?: string;
    /**
     * Logger service base url
     * default : `http://config.byte.mn`
     */
    baseUri?: string;
    request?: {
        /**
         * request timeout
         * default : 5 sec
         */
        timeout?: number;
    };
}
export interface IConfig {
    [key: string]: {
        [key: string]: any;
    };
}
export declare class ConfigSDK {
    private options;
    constructor(options: IConfigSDK);
    private _inited;
    readonly inited: boolean;
    private _dta;
    readonly dta: any;
    readonly requestTimeout: number;
    readonly requestBaseuri: string;
    readonly requestToken: string;
    readonly configEnv: string;
    init(): Promise<void>;
}
export declare function configInit(opt: IConfigSDK): Promise<void>;
export declare function config(): IConfig;
