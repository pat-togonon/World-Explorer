import { useState } from "react"
import { fetchOneCountry } from "../service/countryService"

const CountrySearch = () => {

  const [countryToSearch, setCountryToSearch] = useState('')

  const handleCountrySearch = async (_event) => {

    if (!countryToSearch) {
      console.log('Please specify a country to explore')
      // portal notif for this please
      return
    }
    
    const country = countryToSearch.trim().toLowerCase()

    try {
      const countryData = await fetchOneCountry(country)
      console.log('country data', countryData)
      //then navigate to country page
    } catch (error) {
      console.log('error is', error)
      console.log('error is: Oops', error.response.data.error)
      //then modal/portal for error
    }

    setCountryToSearch('')

  }


  return (
    <>
      <h2>Explore a country</h2>
      <input type="text" name="search-country" value={countryToSearch} placeholder="japan..." onChange={({ target }) => setCountryToSearch(target.value)}/>
      <button type="button" name="search-country-button" onClick={handleCountrySearch}>explore</button>
    </>
  )
}

export default CountrySearch