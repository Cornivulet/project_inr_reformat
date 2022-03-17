const DisplayKPI = ({titre, description, score, score_region, nomVille, nomRegion, nomDepartement}) => {
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
                        <header>Evo de la région</header>
                        <h2>{score_region}</h2>
                        <footer>{nomRegion}</footer>
                    </article>
                </div>
                <div>
                    <article>
                        {score}
                        <footer>{nomVille}</footer>
                    </article>

                </div>
                <div>
                    <article>
                        <header>Evo du département</header>
                        Score du département
                        <footer>{nomDepartement}</footer>
                    </article>


                </div>
            </div>
        </>
    );
};
export default DisplayKPI;