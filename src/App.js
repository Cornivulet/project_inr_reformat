import {useState} from "react";

function App() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([
        {id: 1, nom: 'Paris', note1: 10, note2:3, note3:5, note4:8},
        {id: 2, nom: 'Lyon', note1: 10, note2:3, note3:5, note4:8},
        {id: 3, nom: 'Marseille', note1: 10, note2:3, note3:5, note4:8},
        {id: 4, nom: 'Toulouse', note1: 10, note2:3, note3:5, note4:8}
    ]);
    //function that check if the user types on enter
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value);
        }
    }
  return (
    <div className="App">
        <div className='container'>
            <h1>Analysez les données de votre commune</h1>

            <input type="search" id="search" name="search" placeholder="Search" onKeyDown={handleKeyPress} />

            { searchResults && (
                searchResults.map((searchResult=> {
                 return <article key={searchResult.id}> {searchResult.nom} </article>
                }))
            )}
        </div>

    </div>
  );
}

export default App;
