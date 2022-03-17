import {useState} from "react";
import DisplayKPI from "./components/DisplayKPI";
import {fetchApi} from "./lib/fetchApi";
import {FRONT_LABELS} from "./lib/constants";

function App() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //function that check if the user types on enter
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value);
        }
    }

    const data = async () => await fetchApi('test', {
        "nom_com_like": searchValue
    })();


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

                {searchResults && (
                    searchResults.map((searchResult => {
                        return <article key={searchResult.id}> {searchResult.nom} </article>
                    }))
                )}
            </div>
            <DisplayKPI titre={FRONT_LABELS.GLOBAL_SCORE_TITLE}/>

            <DisplayKPI titre={FRONT_LABELS.INFORMATION_ACCESS_TITLE}
                        description={FRONT_LABELS.INFORMATION_ACCESS_DESCRIPTION}/>

            <DisplayKPI titre={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_TITLE}
                        description={FRONT_LABELS.NUMERIC_INTERFACE_ACCESS_DESCRIPTION}/>

            <DisplayKPI titre={FRONT_LABELS.NUMERIC_SKILLS_TITLE}
                        description={FRONT_LABELS.NUMERIC_SKILLS_DESCRIPTION}/>

            <DisplayKPI titre={FRONT_LABELS.ADMINISTRATIVE_SKILLS_TITLE}
                        description={FRONT_LABELS.ADMINISTRATIVE_SKILLS_DESCRIPTION}/>


        </div>
    );
}

export default App;
