const request = require('request');

export interface IOptions {
    /**
     * request timeout seconts
     */
    timeout: number

    /**
     * request headers
     */
    header: any
}
export async function get<T>(uri: string, options: IOptions) {
    return await new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'GET',
            headers: options.header || {},
            json: true,
            timeout: options.timeout * 1000
        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                return resolve(body)
            }
            reject(body);
        });
    });
}

export async function post<T>(uri: string, options: IOptions, params: any) {
    return new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'POST',
            headers: options.header || {},
            json: true,
            timeout: options.timeout * 1000,
            body: params

        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                return resolve(body)
            }
            reject(body);
        });
    });
}

export async function put<T>(uri: string, options: IOptions, params: any) {
    return new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'PUT',
            headers: options.header || {},
            json: true,
            timeout: options.timeout * 1000,
            body: params,

        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                return resolve(body)
            }
            reject(body);
        });
    });

}
