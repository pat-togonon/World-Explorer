import { useEffect } from "react"
import { useOneCountryStore } from "../store/oneCountryStore"
import { useParams } from "react-router-dom"
import { PercentPopulation } from "./countryFeed"
import { useAllCountryStore } from "../store/allCountryStore"

const UnitedNationMember = ({ UN }) => {

  return (
    <>
      <img src={UN ? '/UN.svg' : '/non-UN.svg'} />
      <p>{UN ? '' : 'Not a '}Member of the United Nations</p>
    </>
  )
}

const WeekStart = ({ day }) => {
  const formattedDay = day.charAt(0).toUpperCase() + day.slice(1)
  
  return <p>Week starts on a {formattedDay}.</p>
}

const Gini = ({ gini }) => {
  const year = Object.keys(gini)
  const value = Object.values(gini)

  console.log(year, value)

  if (value >= 20 && value <= 29) {
    return (
      <>
        <h3>Very Equal (Gini Coefficient is {value} in {year})</h3>
        <p>Most people earn about the same. There's a strong middle class.</p>
        <p>You could work any decent job and still afford housing, healthcare, and weekend fun.</p>
      </>
    )
  }

  if (value >= 30 && value <= 39) {
    return (
      <>
        <h3>Moderate Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>There's a mix. Some are richer than others, but society still feels stable.</p>
        <p>There's visible wealth, but everyday life is decent for most.</p>
      </>
    )
  }

  if (value >= 40 && value <= 49) {
    return (
      <>
        <h3>Noticeable Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>The gap between rich and poor is clear. Wealth is concentrated.</p>
        <p>You might know someone with 3 cars and someone who skips meals — both in the same city.</p>
      </>
    )
  }

  if (value >= 50 && value <= 64) {
    return (
      <>
        <h3>High Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>The rich are very rich. The poor are very poor. Big gap.</p>
        <p>Some live in mansions next to slums. It's harder to climb out of poverty.</p>
      </>
    )
  }

  if (value >= 65) {
    return (
      <>
        <h3>Extreme Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>Most of the country's wealth is in the hands of very few.</p>
        <p>Opportunity feels impossible. Corruption likely. Social tension is high.</p>
      </>
    )
  }
  
}

const Currency = ({ currencies }) => {

  const currencyList = Object.values(currencies)
  console.log('currency', currencyList)

  return (
    <>
    <h3>Currencies</h3>
    {currencyList.map(c => <li key={c.name}>{c.name} ({c.symbol})</li>)}
    </>
  )

}

const Borders = ({ country, allCountries }) => {
  const borderingCountries = country.borders
  
  let listOfBorderingCountry = []

  for (const borderingCountry of borderingCountries) {
    const commonName = allCountries.find(a => a.cca3 === borderingCountry).name.common
    listOfBorderingCountry.push(commonName)
  }

  return (
    <>
    <h3>Bordering countries</h3>
    {listOfBorderingCountry.map((c, index) => <li key={`${c.cca3}-${index}`}>{c}</li>)}
    </>
  )
}

const LandLocked = ({ country, allCountries }) => {

  if (!country.landlocked && !country.borders) {
    return <div>Island nation. No land borders and surrounded by sea.</div>
  }

  if (!country.landlocked && country.borders) {
    return (
      <>
      <p>This country touches other nations on land but still has a coastline to the ocean.</p>
      <Borders country={country} allCountries={allCountries} />
      </>
    )
  }

  return (
    <>
      <p>Surrounded by land, with neighbors on all sides.</p>
      <Borders country={country} allCountries={allCountries} />
    </>
  )
}

const CountryPage = () => {

  // use the country name on the url params to hydrate store every browser refresh
  // also window to scroll up auto here cos SPA
  
  const setOneCountry = useOneCountryStore(state => state.setOneCountry)
  const countryDetails = useOneCountryStore(state => state.oneCountryDetails)
  const fetchOneCountry = useOneCountryStore(state => state.fetchOneCountry)
  const allCountries = useAllCountryStore(state => state.allCountries)
  const { country } = useParams()

  useEffect(() => {
    
    if (country) {
      console.log('fetching one country details...')
      setOneCountry(country)
      fetchOneCountry(country)
    }
  
  }, [country])


  if (countryDetails.length === 0 || allCountries.length === 0) {
    // add a loader?
    return <div>Country not found or loading...</div>
  }

  console.log('details', countryDetails)

  return (
    <>
      <h1>{countryDetails.name.common}</h1>
      <h3>{countryDetails.name.official}</h3>
      <p>Alternative: {countryDetails.altSpellings.map(a => a).join(', ')}</p>
      <h2>Flag</h2>
      <img src={countryDetails.flags.png} />
      
      <h2>Overview</h2>
      {countryDetails.independent && <img src={countryDetails.coatOfArms.png} />}
      <p>{countryDetails.independent && "Independent country"}</p>
      <UnitedNationMember UN={countryDetails.unMember} />
      {countryDetails.capital ? <p>Capital: {countryDetails.capital.map(c => c).join(', ')}</p> : ''}

      <h2>People and Language</h2>
      <p>What you'll hear in the streets (languages): {Object.values(countryDetails.languages).map(l => l).join(', ')}</p>
      <p>Population: <PercentPopulation country={countryDetails} /></p>
      {countryDetails.demonyms && <p>People from {countryDetails.name.common} are called {countryDetails.demonyms.eng.f}</p>}
      
      <h2>Location and Geography</h2>
      <p>Continent: {countryDetails.continents.map(c => c)}</p>
      <p>Region: {countryDetails.region}</p>
      {countryDetails.subregion && <p>Subregion: {countryDetails.subregion}</p>}
      <p>Land area: {countryDetails.area.toLocaleString()} sq km</p>
      <LandLocked country={countryDetails} allCountries={allCountries} />
      
      <h2>Economy</h2>
      {countryDetails.currencies && <Currency currencies={countryDetails.currencies} />}
      {countryDetails.gini && <Gini gini={countryDetails.gini} />}

      <h2>Systems and Infrastructure</h2>
      <p>Dialing Code (root): {countryDetails.idd.root}</p>
      <p>Top level domain: {countryDetails.tld?.map(t => t).join(', ')}</p>
      <p>Timezones: {countryDetails.timezones.map(t => t).join(', ')}</p>
      <WeekStart day={countryDetails.startOfWeek} />
      <p>In {countryDetails.name.common}, drivers sit on the {countryDetails.car.side === 'right' ? 'left' : 'right'} side of the car and keep to the {countryDetails.car.side} side of the road.</p>
      

    </>
  )



}

export default CountryPage 