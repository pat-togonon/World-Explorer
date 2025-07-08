
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
    return <div>{country.name.common} is an island nation. No land borders and surrounded by sea.</div>
  }

  if (!country.landlocked && country.borders) {
    return (
      <>
      <p>{country.name.common} touches other nations on land but still has a coastline to the ocean.</p>
      <Borders country={country} allCountries={allCountries} />
      </>
    )
  }

  return (
    <>
      <p>{country.name.common} is surrounded by land with neighbors on all sides (landlocked).</p>
      <Borders country={country} allCountries={allCountries} />
    </>
  )
}

const LocationAndGeography = ({ countryDetails, allCountries }) => {

  // google maps or maps in general - use google maps api and lati and long
  // for the entire country + capital
  // LAND AREA: Comparison or ranking (top most or least land area) and covers %inhabitable land in the world
  // LAND AREA: With graph / visuals also please (world vs average vs here)
  // landlocked - use icon too
  // Culture snippet? This continent / region / subregion is known for.... (can use json file or copy)


  return (
    <>
      <h2>Location and Geography</h2>
      <p>Continent: {countryDetails.continents.map(c => c)}</p>
      <p>Region: {countryDetails.region}</p>
      {countryDetails.subregion && <p>Subregion: {countryDetails.subregion}</p>}
      <p>Land area: {countryDetails.area.toLocaleString()} sq km</p>
      <LandLocked country={countryDetails} allCountries={allCountries} />
    </>
  )
}

export default LocationAndGeography