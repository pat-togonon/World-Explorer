import { useState } from "react"
import { useOneCountryStore } from "../store/oneCountryStore"
import { Outlet, useNavigate } from "react-router-dom"

const CountrySearch = () => {

  const [countryToSearch, setCountryToSearch] = useState('')
  const setOneCountry = useOneCountryStore(state => state.setOneCountry)
  const fetchOneCountry = useOneCountryStore(state => state.fetchOneCountry)
  const oneCountryDetails = useOneCountryStore(state => state.oneCountryDetails)
  const navigate = useNavigate()

  console.log('one c de', oneCountryDetails)

  const handleCountrySearch = async (event) => {
    event.preventDefault()

    if (!countryToSearch) {
      console.log('Please specify a country to explore')
      // portal notif for this please
      return
    }
  

    try {
      console.log('to search', countryToSearch)
      await fetchOneCountry(countryToSearch.trim().toLowerCase())
      console.log('one country details', oneCountryDetails)
      //then navigate to country page
      navigate(`/country/${countryToSearch}`)
    } catch (error) {
      console.log('error is', error)
      console.log('error is: Oops', error.response.data.error)
      //then modal/portal for error
    }

    setCountryToSearch('')

  }

  const handleCountryToSearch = (event) => {
    const country = event.target.value
    console.log('country input', country)
    setOneCountry(country.trim().toLowerCase() )
    setCountryToSearch(country)
  }


  return (
    <>
      <h2>Explore a country</h2>
      <form onSubmit={handleCountrySearch}>
        <input type="text" name="search-country" value={countryToSearch} placeholder="enter a country..." onChange={handleCountryToSearch}/>
        <button type="submit" name="search-country-button">explore</button>
      </form>
      <Outlet />
    </>
  )
}

export default CountrySearch