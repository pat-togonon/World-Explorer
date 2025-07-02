import CountrySearch from "./components/countrySearch"
import CountryFeed from "./components/countryFeed"
import CountryPage from "./components/countryPage"
import { Route, Routes } from "react-router-dom"
import { useAllCountryStore } from "./store/allCountryStore"
import { useEffect } from "react"

const App = () => {
  
  const fetchCountries = useAllCountryStore(state => state.fetchCountries)
  const allCountries = useAllCountryStore(state => state.allCountries)

  useEffect(() => {
      fetchCountries()
    }, [])

  return (
    <>
    <Routes>
      <Route path="/" element={<CountrySearch />}>
        <Route index element={<CountryFeed allCountries={allCountries} />} />
      </Route>
      <Route path="/country/:country" element={<CountryPage />} />
    </Routes>
    </>
  )
}

export default App

