export const codeDepartementStr = '{api-codeDepar}';
export const codeRegionStr = '{api-codeReg}';

export const CONSTANTS = {
    URL_BACK: "http://localhost:3002",
    URL_GOUV_REGION: `https://geo.api.gouv.fr/departements/${codeDepartementStr}?fields=region`,
    URL_GOUV_REGION_DEPART: `https://geo.api.gouv.fr/regions/${codeRegionStr}/departements?fields=code`

}

export const FRONT_LABELS = {
    GLOBAL_SCORE_TITLE: "Global Score",
    INFORMATION_ACCESS_TITLE: "Accès à l'information",
    INFORMATION_ACCESS_DESCRIPTION: "Identifier des territoires mal couverts par une offre de service d'information ou des populations qui auront des difficultés à comprendre l'information",
    NUMERIC_INTERFACE_ACCESS_TITLE: "Accès aux interfaces numériques",
    NUMERIC_INTERFACE_ACCESS_DESCRIPTION: "Identifier des territoires mal couverts par les réseaux ou dans lesquels des populations auront des difficultés financières à y accéder.",
    NUMERIC_SKILLS_TITLE: "Compétences numériques",
    NUMERIC_SKILLS_DESCRIPTION: "Identifier des populations parmi lesquelles s'observe une fréquence d'illectronisme ou difficulté à utiliser internet.",
    ADMINISTRATIVE_SKILLS_TITLE: "Compétences administratives",
    ADMINISTRATIVE_SKILLS_DESCRIPTION: "Identifier des populations parmi lesquelles s'observent des difficultés à accomplir des procédures administratives."
}
