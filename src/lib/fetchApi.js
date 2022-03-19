import { CONSTANTS } from "./constants";
import { getCodeRegion, getDepartementOfRegion } from "./fetchGouvApi";

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

export async function getAllCitiesInsideDepartement(codeIris) {
    const data = await fetchApi('test', {
        "code_iris_like": "^" + codeIris.slice(0,2),
    });
    return data;
}


export async function getAllCitiesOfAllDepartementOfRegion(codeIris) {

    const regionCall = await getCodeRegion(codeIris.slice(0,2));
    const departementList = await getDepartementOfRegion(regionCall.region.code);
    const allDepFormattedStr = formatDepList(departementList);
    const citiesList= await fetchApi('test', {
        "code_iris_like": allDepFormattedStr,
    });


    const d =  {
        citiesList,
        departementList,
        info: regionCall.region
    }
    console.log({d})

    return d;
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



function formatDepList(depList){
    let buffer = "";
    for(const dep of depList){
        buffer += "^"+ dep.code + '|'
    }
    return buffer.slice(0,-1);
}