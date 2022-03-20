import { useState } from "react";
import DisplayKPI from "./components/DisplayKPI";
import { fetchApi, getAllCity, getAllCitiesOfAllDepartementOfRegion, searchForAutoComplete } from "./lib/fetchApi";
import { FRONT_LABELS } from "./lib/constants";


function App() {
    const [searchAutoCompleteResults, setSearchAutoCompleteResults] = useState([]);
    const [showKPI, setShowKPI] = useState(false);
    const [dataPage, setDataPage] = useState(false);

    async function resultForAutoComplete(searchValue) {
        const data = await searchForAutoComplete(searchValue);
        setSearchAutoCompleteResults(data);
    }

    async function attributeKPI(searchResult) {

        const response = await getAllCitiesOfAllDepartementOfRegion(searchResult.code_iris);


        setDataPage({
            region: {
                data: calculateProperties(response.citiesList),
                info: response.info
            },

            departement: {
                data: calculateProperties(response.citiesList.filter((item) => item.code_iris.slice(0, 2) == searchResult.code_iris.slice(0, 2))),
                info: response.departementList.find((item) => item.code == searchResult.code_iris.slice(0, 2))
            },

            cities: {
                data: calculateProperties(response.citiesList.filter((item) => item.code_iris == searchResult.code_iris)),
                info: searchResult
            }
        });

        setShowKPI(!showKPI);
    }

    function calculateProperties(list) {

        const inrObject = list.reduce(function (previousValue, currentValue) {
            return {
                "score_global_region": parseInt(previousValue["score_global_region"]) + parseInt(currentValue["score_global_region"]),
                "score_global": parseInt(previousValue["score_global"]) + parseInt(currentValue["score_global"]),
                "population": parseInt(previousValue["population"] + currentValue["population"]),
                "global_competences": parseInt(previousValue["global_competences"]) + parseInt(currentValue["global_competences"]),
                "global_access": parseInt(previousValue["global_access"] + currentValue["global_access"]),
                "competence_numerique_scolaire": parseInt(previousValue["competence_numerique_scolaire"]) + parseInt(currentValue["competence_numerique_scolaire"]),
                "competence_administrative": parseInt(previousValue["competence_administrative"]) + parseInt(currentValue["competence_administrative"]),
                "access_interface_numeric": parseInt(previousValue["access_interface_numeric"]) + parseInt(currentValue["access_interface_numeric"]),
                "access_info": parseInt(previousValue["access_info"]) + parseInt(currentValue["access_info"])
            }
        });
        for (const props in inrObject) {
            inrObject[props] = (inrObject[props] / list.length).toFixed(2);
        }

        return inrObject;

    }

    //function that check if the user types on enter
    async function handleKeyPress(e) {
        if (e.key === 'Enter') {
            await resultForAutoComplete(e.target.value);
        }
    }

    return (
        <div className="App">
            <div className='container'>
                <h1>Analysez les données de votre commune</h1>

                <input type="search" id="search" name="search" placeholder="Search" onKeyDown={handleKeyPress} />

                <article>
                    Un indice élevé indique une fragilité numérique plus grande.
                    Le calcul des indicateurs étant relatif par rapport aux autres communes,
                    la moyenne de chaque indicateur est de 100.
                </article>

                {searchAutoCompleteResults && !showKPI && (
                    [...new Map(searchAutoCompleteResults.map(item => [item["nom_com"], item])).values()].map((searchAutoCompleteResult => {
                        return <article onClick={() => attributeKPI(searchAutoCompleteResult)}
                            key={searchAutoCompleteResult.code_iris}> {searchAutoCompleteResult.nom_com} </article>
                    })).slice(0, 3)
                )}
            </div>
            {showKPI && dataPage && (
                <>
                    {console.log(dataPage)}
                    <DisplayKPI
                        titre={FRONT_LABELS.GLOBAL_SCORE_TITLE}
                        score={dataPage.cities.data.score_global}
                        nomVille={dataPage.cities.info.nom_com}
                        scoreRegion={dataPage.region.info.score_global}
                        nomRegion={dataPage.region.info.nom}
                        nomDepartement={dataPage.departement.info.nom}
                    />


                    <DisplayKPI
                        titre={FRONT_LABELS.INFORMATION_ACCESS_TITLE}
                        description={FRONT_LABELS.INFORMATION_ACCESS_DESCRIPTION}
                        score={dataPage.cities.data.global_access}
                        nomVille={dataPage.cities.info.nom_com}
                        scoreRegion={dataPage.cities.info.global_access}
                        nomRegion={dataPage.region.info.nom}
                        nomDepartement={dataPage.departement.info.nom}
                    />

                    <DisplayKPI
                        titre={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_TITLE}
                        description={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_DESCRIPTION}
                        score={dataPage.cities.data.access_interface_numeric}
                        nomVille={dataPage.cities.info.nom_com}
                        scoreRegion={dataPage.cities.info.access_interface_numeric}
                        nomRegion={dataPage.region.info.nom}
                        nomDepartement={dataPage.departement.info.nom}
                    />


                    <DisplayKPI
                        titre={FRONT_LABELS.NUMERIC_SKILLS_TITLE}
                        description={FRONT_LABELS.NUMERIC_SKILLS_DESCRIPTION}
                        score={dataPage.cities.data.global_competences}
                        nomVille={dataPage.cities.info.nom_com}
                        scoreRegion={dataPage.cities.info.global_competences}
                        nomRegion={dataPage.region.info.nom}
                        nomDepartement={dataPage.departement.info.nom}
                    />

                    <DisplayKPI
                        titre={FRONT_LABELS.ADMINISTRATIVE_SKILLS_TITLE}
                        description={FRONT_LABELS.ADMINISTRATIVE_SKILLS_DESCRIPTION}
                        score={dataPage.cities.data.competence_administrative}
                        nomVille={dataPage.cities.info.nom_com}
                        scoreRegion={dataPage.cities.info.competence_administrative}
                        nomRegion={dataPage.region.info.nom}
                        nomDepartement={dataPage.departement.info.nom}
                    />

                </>

            )

            }


        </div>
    );
}

export default App;
