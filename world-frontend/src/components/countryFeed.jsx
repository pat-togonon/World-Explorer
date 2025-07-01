import { useEffect, useRef, useState } from "react"
import { useAllCountryStore } from "../store/allCountryStore"

const CountryFeed = () => {

  const allCountries = useAllCountryStore(state => state.allCountries)
  const fetchCountries = useAllCountryStore(state => state.fetchCountries)
  const [visibleCountriesCount, setVisibleCountriesCount] = useState(10)
  const loaderRef = useRef()

  const visibleCountries = allCountries.slice(0, visibleCountriesCount)
  console.log('visible', visibleCountries)
  console.log('all', allCountries)

  // add loader
  
  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCountriesCount(prev => prev + 10)
        }
      },
      { threshold: 1 }
    )

    const current = loaderRef.current

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [])

  const handleGoingBackUp = (_event) => {
    window.scrollTo({ top: 0, behavior: 'auto' }) 
  }

  return (
    <>
      <div>
        {visibleCountries.map(country => (
          <div key={country.cca3} className="country-card">
            <h2>{country.name.common}</h2>
            <p>Official Name: {country.name.official}</p>
            <p>Capital: {country.capital}</p>
            <p>Flag: {country.flag}</p>
          </div>
        ))}
        <div ref={loaderRef} style={{ height: '1px' }} />
      </div>
      {visibleCountries.length < visibleCountriesCount && <button type="button" onClick={handleGoingBackUp}>You have seen all the countries. Click here to go back up.</button>}      
    </>
  )



  
 

}

export default CountryFeed