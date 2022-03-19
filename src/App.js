import { useState } from "react";
import DisplayKPI from "./components/DisplayKPI";
import { fetchApi, getAllCity, getAllCitiesOfAllDepartementOfRegion, searchForAutoComplete } from "./lib/fetchApi";
import { FRONT_LABELS } from "./lib/constants";


function App() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchAutoCompleteResults, setSearchAutoCompleteResults] = useState([]);
    const [showKPI, setShowKPI] = useState(false);
    const [selectedCityPart, setSelectedCityPart] = useState(false);
    const [selectedCitiesOfDepartemants, setSelectedCitiesOfDepartements] = useState(false);
    const [selectedCitiesOfRegion, setSelectedCitiesOfRegion] = useState(false);

    async function resultForAutoComplete(searchValue) {
        const data = await searchForAutoComplete(searchValue);
        setSearchAutoCompleteResults(data);
    }

    async function attributeKPI(searchResult) {

        const response = await getAllCitiesOfAllDepartementOfRegion(searchResult.code_iris);

        const region = {
            data: calculateProperties(response.citiesList),
            info: response.info
        }

        const departement = {
            data: calculateProperties(response.citiesList.filter((item) => item.code_iris.slice(0, 2) == searchResult.code_iris.slice(0, 2))),
            info: response.departementList.find((item) => item.code == searchResult.code_iris.slice(0, 2))
        }

        const cities = {
            data: calculateProperties(response.citiesList.filter((item) => item.code_iris == searchResult.code_iris)),
            info: searchResult
        }

        console.log({region}, {departement}, {cities})

   /*     
        setSelectedCitiesOfRegion(calculateProperties(regions));


        if(selectedCitiesOfRegion){
            setSelectedCitiesOfDepartements(calculateProperties({
                info: selectedCitiesOfRegion.departementList.find((item) => item.code == searchResult.code_iris.slice(0, 2)),
                citiesList: selectedCitiesOfRegion.citiesList.filter((item) => item.code_iris.slice(0, 2) == searchResult.code_iris.slice(0, 2))
            }));

        }

        if(selectedCitiesOfRegion && selectedCitiesOfDepartemants){
            setSelectedCityPart(calculateProperties({
                citiesList: selectedCitiesOfDepartemants.citiesList.filter((item) => item.code_iris == searchResult.code_iris),
                info: searchResult
            }));

        }  

        console.log(selectedCitiesOfRegion, selectedCitiesOfDepartemants, setSelectedCityPart)

        */
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
    /*

    const data = async () => await fetchApi('test', {
        "nom_iris_like": searchValue
    });
*/
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
            {showKPI && selectedCityPart && selectedCitiesOfDepartemants && selectedCitiesOfRegion && (
                <>
                    <DisplayKPI
                        titre={FRONT_LABELS.GLOBAL_SCORE_TITLE}
                        score={selectedCityPart.citiesList.score_global}
                        nomVille={selectedCityPart.info.nom_com}
                        scoreRegion={selectedCitiesOfRegion.citiesList.score_global}
                        nomRegion={selectedCitiesOfRegion.info.nom}
                        nomDepartement={selectedCitiesOfDepartemants.info.nom}

                    />
                    <DisplayKPI titre={FRONT_LABELS.INFORMATION_ACCESS_TITLE}
                        description={FRONT_LABELS.INFORMATION_ACCESS_DESCRIPTION} score={selectedCityPart.citiesList.access_info} />
                    <DisplayKPI titre={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_TITLE}
                        description={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_DESCRIPTION} score={selectedCityPart.citiesList.access_interface_numeric} />
                    <DisplayKPI titre={FRONT_LABELS.NUMERIC_SKILLS_TITLE}
                        description={FRONT_LABELS.NUMERIC_SKILLS_DESCRIPTION} score={selectedCityPart.citiesList.competence_numerique_scolaire} />
                    <DisplayKPI titre={FRONT_LABELS.ADMINISTRATIVE_SKILLS_TITLE}
                        description={FRONT_LABELS.ADMINISTRATIVE_SKILLS_DESCRIPTION} score={selectedCityPart.citiesList.competence_administrative} />
                </>

            )

            }


        </div>
    );
}

export default App;
