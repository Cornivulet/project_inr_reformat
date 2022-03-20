import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 400 },
        { duration: '20m', target: 400 },
        { duration: '2m', target: 0 },
    ],
};

export default function () {
    const BASE_URL = 'http://json-server:3002';

    const responses = http.batch([
        ['GET', `${BASE_URL}/test?nom_com_like=aast`, null, { tags: { name: 'aastTest' } }],
    ]);

    sleep(1);
}
