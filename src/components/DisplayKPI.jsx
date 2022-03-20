const DisplayKPI = ({
    titre,
    description,
    nomVille,
    score,
    nomRegion,
    scoreRegion,
    nomDepartement,
    scoreDepartement
}) => {
    //function that put strings in uppercase
    const upperCase = (str) => {
        if (str) {
            return str.toUpperCase();
        }
    }
    return (
        <>
            <h1>{upperCase(titre)}</h1>
            <p>{description}</p>

            <div className="grid">
                <div>
                    <article>
                        <header>Région</header>
                        <h2>{scoreRegion || 'Non spécifié'}</h2>
                        <footer>{nomRegion}</footer>
                    </article>
                </div>
                <div>
                    <article>
                        <header>Ville choisie</header>
                        {score || 'Non spécifié'}
                        <footer>{nomVille}</footer>
                    </article>
                </div>
                <div>
                    <article>
                        <header>Département</header>
                        <h2>{scoreDepartement || 'Non spécifié'}</h2>
                        <footer>{nomDepartement}</footer>
                    </article>

                </div>
            </div>
        </>
    );
};
export default DisplayKPI;
