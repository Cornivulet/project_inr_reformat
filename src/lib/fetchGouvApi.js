import { CONSTANTS, codeDepartementStr, codeRegionStr } from "./constants";

export async function getCodeRegion(codeDepartement){
    return await getFromMacronApi(CONSTANTS.URL_GOUV_REGION, codeDepartementStr, codeDepartement)
}

export async function getDepartementOfRegion(codeRegion){
    return await getFromMacronApi(CONSTANTS.URL_GOUV_REGION_DEPART, codeRegionStr, codeRegion)
}

async function getFromMacronApi(url, str, code) {
    const response = await fetch(url.replace(str, code));
    return await response.json();
}