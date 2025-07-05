import { PercentPopulation } from "../countryFeed"

const Fifa = ({ fifaMember, country }) => {

  if (!fifaMember) {
    return null
  }

  return (
    <>
       <h3>Sports</h3>
       <p>{country} is part of the global football family FIFA.</p>
       <p>FIFA refers to the Fédération Internationale de Football Association - the international governing body for football (soccer).</p>
       <p>This means {country} can send teams to official football matches around the world.</p>

    </>
  )
}

const PeopleAndLanguage = ({ countryDetails}) => {

  //LANGUAGE: add a bible verse or the Gospel translation
  // steps. Set a text to translate to country local language (Google Translate API or libreText). and then TTS 

  //POPULATION: Ranking (top most or least populated - with trophy)
  // Bar graph of population vs. world average.


  return (
    <>
      <h2>People and Language</h2>
      <p>What you'll hear in the streets (languages): {Object.values(countryDetails.languages).map(l => l).join(', ')}</p>
      <p>Population: <PercentPopulation country={countryDetails} /></p>
      {countryDetails.demonyms && <p>People from {countryDetails.name.common} are called {countryDetails.demonyms.eng.f}.</p>}
      <Fifa fifaMember={countryDetails.fifa} country={countryDetails.name.common} />
     
      
    </>
  )
}

export default PeopleAndLanguage