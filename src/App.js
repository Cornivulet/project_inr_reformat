import {useState} from "react";
import DisplayKPI from "./components/DisplayKPI";
import {fetchApi, getAllCity, getAllInsideDepartement, searchForAutoComplete} from "./lib/fetchApi";
import {FRONT_LABELS} from "./lib/constants";


function App() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchAutoCompleteResults, setSearchAutoCompleteResults] = useState([]);
    const [showKPI, setShowKPI] = useState(false);
    const [selectedValue, setSelectedValue] = useState({});

    async function resultForAutoComplete(searchValue) {
        const data = await searchForAutoComplete(searchValue);
        setSearchAutoCompleteResults(data);
    }

    async function attributeKPI(searchResult) {
        const getCities = await getAllCity(searchResult.nom_com);
        const getDepartement = await getAllInsideDepartement(searchResult.nom_com);
        const getRegion = await getAllCity(searchResult.nom_com);

        if(getCities){
            setSelectedValue(calculateSomething(getCities));
        }
        setShowKPI(!showKPI);
    }

    function average(value){

    }

    function calculateSomething(result) {
        const bigObject = result.reduce(function (previousValue, currentValue) {
            return {
                "score_global_region": parseInt(previousValue["score_global_region"]) + parseInt(currentValue["score_global_region"]),
                "score_global": parseInt(previousValue["score_global"]) + parseInt(currentValue["score_global"]),
                "population": previousValue["population"] + currentValue["population"],
                "nom_iris": previousValue["nom_iris"] + currentValue["nom_iris"],
                "nom_com": currentValue["nom_com"],
                "global_competences": parseInt(previousValue["global_competences"]) + parseInt(currentValue["global_competences"]),
                "global_access": previousValue["global_access"] + currentValue["global_access"],
                "competence_numerique_scolaire": parseInt(previousValue["competence_numerique_scolaire"]) + parseInt(currentValue["competence_numerique_scolaire"]),
                "competence_administrative": parseInt(previousValue["competence_administrative"]) + parseInt(currentValue["competence_administrative"]),
                "code_iris": previousValue["code_iris"] + currentValue["code_iris"],
                "access_interface_numeric": parseInt(previousValue["access_interface_numeric"]) + parseInt(currentValue["access_interface_numeric"]),
                "access_info": parseInt(previousValue["access_info"]) + parseInt(currentValue["access_info"])
            }
        });
        bigObject["score_global_region"] = (bigObject.score_global_region / result.length).toFixed(2);
        bigObject["score_global"] = (bigObject.score_global / result.length).toFixed(2);
        bigObject["population"] = (bigObject.population / result.length).toFixed(2);
        bigObject["global_competences"] = (bigObject.global_competences / result.length).toFixed(2);
        bigObject["global_access"] = (bigObject.global_access / result.length).toFixed(2);
        bigObject["competence_numerique_scolaire"] = (bigObject.competence_numerique_scolaire / result.length).toFixed(2);
        bigObject["competence_administrative"] = (bigObject.competence_administrative / result.length).toFixed(2);
        bigObject["access_interface_numeric"] = (bigObject.access_interface_numeric / result.length).toFixed(2);
        bigObject["access_info"] = (bigObject.access_info / result.length).toFixed(2);
        return bigObject;
    }

        //function that check if the user types on enter
        async function handleKeyPress(e) {
            if (e.key === 'Enter') {
                await resultForAutoComplete(e.target.value);
            }
        }

        const data = async () => await fetchApi('test', {
            "nom_iris_like": searchValue
        });

        return (
            <div className="App">
                <div className='container'>
                    <h1>Analysez les données de votre commune</h1>

                    <input type="search" id="search" name="search" placeholder="Search" onKeyDown={handleKeyPress}/>

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
                {showKPI && selectedValue && (
                    <>
                        <DisplayKPI titre={FRONT_LABELS.GLOBAL_SCORE_TITLE} score={selectedValue.score_global} nomVille={selectedValue.nom_com}/>
                        <DisplayKPI titre={FRONT_LABELS.INFORMATION_ACCESS_TITLE}
                                    description={FRONT_LABELS.INFORMATION_ACCESS_DESCRIPTION} score={selectedValue.access_info}/>
                        <DisplayKPI titre={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_TITLE}
                                    description={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_DESCRIPTION} score={selectedValue.access_interface_numeric}/>
                        <DisplayKPI titre={FRONT_LABELS.NUMERIC_SKILLS_TITLE}
                                    description={FRONT_LABELS.NUMERIC_SKILLS_DESCRIPTION} score={selectedValue.competence_numerique_scolaire} />
                        <DisplayKPI titre={FRONT_LABELS.ADMINISTRATIVE_SKILLS_TITLE}
                                    description={FRONT_LABELS.ADMINISTRATIVE_SKILLS_DESCRIPTION} score={selectedValue.competence_administrative}/>
                    </>

                )

                }


            </div>
        );
    }

    export default App;
