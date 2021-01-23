import {useState} from 'react';

const BASE_URL = 'http://localhost:5000/api';

const httpReq = async (url, method='GET', headers={}, body={}) => {
    const isHttpError = false;
    let response, responseData;
    
    try {
        response = await fetch(BASE_URL+url,{method: method,headers: headers,body: body});
        if(response.ok) {
            responseData = await response.json();
        } else {
            isHttpError = true;
            responseData = await response.json();
        }
    } catch(err) {
        console.log(err);
    }
    return [isHttpError, responseData];
}

export default httpReq;