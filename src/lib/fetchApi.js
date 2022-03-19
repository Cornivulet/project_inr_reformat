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

export async function getAllCity(searchValue) {
    const data = await fetchApi('test', {
        "nom_com": searchValue,
    });
    return data;
}

export async function getAllInsideDepartement(searchValue) {
    const data = await fetchApi('test', {
        "nom_com": searchValue,
    });
    return data;
}

export async function searchForAutoComplete(searchValue) {
    const data = await fetchApi('test', {
        "nom_com_like": "^" + searchValue,
    });
    return data;
}

function formatQueryParams(queryParams){
    let str = '?';
    for(const paramsIndex in queryParams) {
        str+=`${encodeURIComponent(paramsIndex)}=${encodeURIComponent(queryParams[paramsIndex])}&`
    }

    return str;
}

