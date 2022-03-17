import { CONSTANTS } from "./constants";

export async function fetchApi(resource,queryParams){

    let formattedQueryParams = "";
    if(queryParams){
        formattedQueryParams = formatQueryParams(queryParams);
    } 

    if(resource){
        resource = '/' + resource
    }

    const response = await fetch(CONSTANTS.URL_BACK+resource+formattedQueryParams);

    return await response.json();

}

function formatQueryParams(queryParams){
    let str = '?';
    for(const paramsIndex in queryParams) {
        str+=`${encodeURIComponent(paramsIndex)}=${encodeURIComponent(queryParams[paramsIndex])}&`
    }

    return str;
}

