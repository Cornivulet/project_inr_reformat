import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
const tableau = JSON.parse(open('./sample.json'));
const URL = "http://json-server:3002/test?nom_com_like=aast"



function basicTest() {
    http.get(URL);
    sleep(1);
}

function smokeTest(){
    const response =  http.get(URL).json();
    check(response, {"Length equal" : (tab) => tab.length === tableau.test.length })

}

function stressTest(){

}



function soakTest(){


}

function loadTest(){


}

export default function () {

    basicTest();
    smokeTest();

}