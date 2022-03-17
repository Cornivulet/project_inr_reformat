const DisplayKPI = () => {
    return (
        <div className="grid">
            <div>
                <article>
                    <header>Nom de Région</header>
                    Score de la région
                    <footer>Comparatif en %</footer>
                </article>
            </div>
            <div>
                <article>
                    <header>Nom de la ville</header>
                    Score de la ville
                    <footer>Footer</footer>
                </article>

            </div>
            <div>
                <article>
                    <header>Score</header>
                    Body
                    <footer>Footer</footer>
                </article>

                Un indice élevé indique une fragilité numérique plus grande.
                Le calcul des indicateurs étant relatif par rapport aux autres communes,
                la moyenne
            </div>
        </div>

    );
};
export default DisplayKPI;