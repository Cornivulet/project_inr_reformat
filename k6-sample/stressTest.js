import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '2m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '2m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '2m', target: 400 },
        { duration: '4m', target: 0 },
    ],
};

export default function () {
    const BASE_URL = 'http://json-server:3002'; // make sure this is not production

    const responses = http.batch([
        ['GET', `${BASE_URL}/test?nom_com_like=aast`, null, { tags: { name: 'aastTest' } }],
    ]);

    sleep(1);
}
