import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'],
        'logged in successfully': ['p(99)<1500'], //
    },
};

const BASE_URL = 'http://json-server:3002';


export default () => {
    const myObjects = http.get(`${BASE_URL}/test?nom_com_like=aast`).json();
    check(myObjects, { 'retrieved cities': (obj) => obj.length > 0 });

    sleep(1);
};
