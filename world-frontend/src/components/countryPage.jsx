import { useEffect } from "react"
import { useOneCountryStore } from "../store/oneCountryStore"
import { useParams } from "react-router-dom"

const CountryPage = () => {

  // use the country name on the url params to hydrate store every browser refresh
  // also window to scroll up auto here cos SPA
  
  const setOneCountry = useOneCountryStore(state => state.setOneCountry)
  const oneCountryDetails = useOneCountryStore(state => state.oneCountryDetails)
  const fetchOneCountry = useOneCountryStore(state => state.fetchOneCountry)
  const { country } = useParams()
  console.log('country', country)

  useEffect(() => {
    if (country) {
      console.log('fetching one country details...')
      setOneCountry(country)
      fetchOneCountry(country)
    }
  }, [country])


  if (!oneCountryDetails) {
    // add a loader?
    return <div>Country not found or loading...</div>
  }

  console.log('details', oneCountryDetails)

  return (
    <>
      <h1>{oneCountryDetails.name?.common}</h1>
    </>
  )



}

export default CountryPage