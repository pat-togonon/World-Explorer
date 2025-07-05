import { useEffect, useState } from "react"
import { useOneCountryStore } from "../store/oneCountryStore"
import { useParams, Outlet, Routes, Route, useNavigate } from "react-router-dom"
import { useAllCountryStore } from "../store/allCountryStore"
import Overview from "./countryPage/overview"
import PeopleAndLanguage from "./countryPage/peopleAndLangugage"
import LocationAndGeography from "./countryPage/locationAndGeography"
import Economy from "./countryPage/economy"
import SystemsAndInfrastructure from "./countryPage/systemsAndInfrastructure"
import TimezoneAndWeekStart from "./countryPage/time"

const CountryPage = () => {

  // use the country name on the url params to hydrate store every browser refresh
  // also window to scroll up auto here cos SPA
  // Add audio / tts for country official name and capital?
  // with add to or remove from bookmarks 
  // with download printables / as pdf

  const [currentTab, setCurrentTab] = useState('')
  
  const oneCountry = useOneCountryStore(state => state.oneCountry)
  const setOneCountry = useOneCountryStore(state => state.setOneCountry)
  const countryDetails = useOneCountryStore(state => state.oneCountryDetails)
  const fetchOneCountry = useOneCountryStore(state => state.fetchOneCountry)
  const allCountries = useAllCountryStore(state => state.allCountries)
  const { country } = useParams()
  const navigate = useNavigate()

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

  const handleOverview = (_event) => {
    setCurrentTab('overview')
    navigate(`/country/${oneCountry}`)
  }

  const handleEconomy = (_event) => {
    setCurrentTab('economy')
    navigate(`/country/${oneCountry}/economy`)
  }

  const handleLocation = (_event) => {
    setCurrentTab('location')
    navigate(`/country/${oneCountry}/location-and-geography`)
  }

  const handlePeople = (_event) => {
    setCurrentTab('people')
    navigate(`/country/${oneCountry}/people-and-language`)
  }

  const handleTime = (_event) => {
    setCurrentTab('time')
    navigate(`/country/${oneCountry}/timezone-and-weather`)
  }

  const handleInfrastructure = (_event) => {
    setCurrentTab('infrastructure')
    navigate(`/country/${oneCountry}/system-and-infrastructure`)
  }

  return (
    <div className="country-page">
      <h1>{countryDetails.name.common}</h1>
      <div className="country-page-under-name-div">
      <div>
        <p>Official name</p>
        <h4>{countryDetails.name.official}</h4>
      </div>
      {countryDetails.capital && <div>
        <p>Capital</p>
        <h4>{countryDetails.capital.map(c => c).join(', ')}</h4>
      </div>}
      </div>
      <h3>Flag</h3>
      <img src={countryDetails.flags.png} />  

      <div className="country-page-nav-grid">
        <div className={currentTab === 'overview' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handleOverview}>
          <img src="/overview-icon.svg"/>
          <p>Overview</p>
        </div>
        <div className={currentTab === 'economy' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handleEconomy}>
          <img src="/chart-icon.svg"/>
          <p>Economy</p>
        </div>
        <div className={currentTab === 'location' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handleLocation}>
          <img src="/map-icon-pin.svg" />
          <p>Location</p>
        </div>
        <div className={currentTab === 'people' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handlePeople}>
          <img src="/people-icon.svg" />
          <p>People and Language</p>
        </div>
        <div className={currentTab === 'time' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handleTime}>
          <img src="/timezone-icon.svg"/>
          <p>Time and Weather</p>
        </div>
        <div className={currentTab === 'infrastructure' ? "country-page-nav-item active" : "country-page-nav-item"} role="button" onClick={handleInfrastructure}>
          <img src="/building-icon.svg" />
          <p>System and Infrastructure</p>
        </div>
      </div>
      <Routes>
        <Route index element={<Overview countryDetails={countryDetails} />} />
        <Route path="/people-and-language" element={<PeopleAndLanguage countryDetails={countryDetails} />} />
        <Route path="/location-and-geography" element={<LocationAndGeography countryDetails={countryDetails} allCountries={allCountries} />} />
        <Route path="/economy" element={<Economy countryDetails={countryDetails} />} />
        <Route path="/system-and-infrastructure" element={<SystemsAndInfrastructure countryDetails={countryDetails} />} />
        <Route path="/timezone-and-weather" element={<TimezoneAndWeekStart countryDetails={countryDetails} />} />
      </Routes>
      

    </div>
  )



}

export default CountryPage 