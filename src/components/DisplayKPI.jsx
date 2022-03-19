import redarrow from '../img/redarrow.webp';
import greenarrow from '../img/greenarrow.webp';

const DisplayKPI = ({titre, description, score, scoreRegion, nomVille, nomRegion, nomDepartement}) => {
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
                        <header>Evo de la région
                            <picture>
                                <source srcSet={redarrow} media={'(max-width: 64 px)'}/>
                                <img src={redarrow} alt=''/>
                            </picture>
                        </header>
                        <h2>{scoreRegion}</h2>
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
                        <header>Evo du département
                            <picture>
                                <source srcSet={greenarrow} media={'(max-width: 64 px)'}/>
                                <img src={greenarrow} alt=''/>
                            </picture>
                        </header>
                        Score du département
                        <footer>{nomDepartement}</footer>
                    </article>


                </div>
            </div>
        </>
    );
};
export default DisplayKPI;
