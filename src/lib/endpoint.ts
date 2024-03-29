import { dev } from '$app/environment';

const headers_json = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
const headers_form = {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'};

export function endpoint(endpoint: string) {
    endpoint = '/api/' + endpoint;
    if (dev) {
        return 'localhost:8000' + endpoint;
    } else {
        console.log(window.location.host + endpoint);
        return window.location.host + endpoint;
    }
}

async function request(method: string, endPoint: string, hs: HeadersInit, body: string, token: string) {
    // hs stands for headerSend
    if (token) {
        hs.Authorization = 'Bearer ' + token;
    }
    let error = false;
    let data: object = {};
    let rezStatus: number = 0;
    const reqData = {
        method: method,
        headers: hs
    }
    if (method !== 'GET') {
        reqData.body = body;
    }
    // We're currently using standard HTTP
    await fetch('http://' + endpoint(endPoint), reqData)
    .then((res) => {
        rezStatus = res.status;
        if (!res.ok) {
            error = true;
        }
        return res.json();
    })
    .then((d:object) => data=d)
    .catch((e) => {
        error = true;
        data = e
    });
    return {'error': error, 'data': data, 'status': rezStatus};
}

function encodeObj(obj: object) {
    var rez: string[] = []
    Object.entries(obj).forEach(([key, value]) => {
        rez.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    })
    return rez.join('&');
}

export async function post(endPoint: string, body: object = {}, token: string = '') {
    return await request('POST', endPoint, headers_json, JSON.stringify(body), token);
}

export async function get(endPoint: string, queryParams: object = {}, token: string = '') {
    return await request('GET', endPoint + '?' + encodeObj(queryParams),
                         headers_json, '', token);
}

export async function patch(endPoint: string, body: object = {}, queryParams: object = {}, token: string = '') {
    return await request('PATCH', endPoint + '?' + encodeObj(queryParams),
                         headers_json, (body)?'':JSON.stringify(body), token); 
}

export async function formdata_post(endPoint: string, body: object = {}) {
    return await request('POST', endPoint, headers_form, encodeObj(body), '');
}
