export interface IOptions {
    /**
     * request timeout seconts
     */
    timeout: number;
    /**
     * request headers
     */
    header: any;
}
export declare function get<T>(uri: string, options: IOptions): Promise<T>;
export declare function post<T>(uri: string, options: IOptions, params: any): Promise<T>;
export declare function put<T>(uri: string, options: IOptions, params: any): Promise<T>;
