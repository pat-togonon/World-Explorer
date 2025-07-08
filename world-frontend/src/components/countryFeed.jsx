import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HandleGoingBackUp = (_event) => {
  window.scrollTo({ top: 0, behavior: 'auto' }) 
}

export const PercentPopulation = ({ country }) => {
  const percent = ((country.population * 100) / import.meta.env.VITE_WORLD_POPULATION_2025).toFixed(2)

  if (country.population === 0) {
    return 'No one lives here. Might be a remote island and the only inhabitants are occasional scientific research teams.'
  }

  if (percent < 0.05) {
    return `${country.population.toLocaleString()} people lives here.`
  }

  return `${country.population.toLocaleString()} people or ${percent}% of the world lives here.`
}

const CountryFeed = ({ allCountries }) => {

  console.log('rendering feed...')

  const [visibleCountriesCount, setVisibleCountriesCount] = useState(5)
  const navigate = useNavigate()
  const loaderRef = useRef()

  const visibleCountries = allCountries.sort((a, b) => b.name.common - a.name.common).slice(0, visibleCountriesCount)

  // add loader
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCountriesCount(prev => prev + 5)
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


  console.log('countries', visibleCountries)
  return (
    <>
      <div>
        {visibleCountries.map(country => (
          <div key={country.cca3} className="country-card" onClick={() => navigate(`/country/${country.name.common.toLowerCase()}`)}>
            <div>
              <div className="country-name-logos">
                <h2>{country.name.common}</h2>
                <div className="UN-lock-logos">
                  {country.unMember && <img src='/UN.svg' />}
                  {country.landlocked ? <img src='/land-locked-v2.svg' /> : <img src='/ocean-wave.svg' />}
                </div>
              </div>
            <img src={country.flags.png} className="flag"/>
            <div className="card-independent">
            {country.independent && <img src={country.coatOfArms.svg} className="coat-of-arms-icon"/>}
            <p>{country.name.official}</p>
            </div>
            <p>Capital: {country.capital}</p>
            <p className="population"><img src='/population.svg' className="population-icon" />{<PercentPopulation country={country} />}</p>
            </div>
            

          </div>
        ))}
        <div ref={loaderRef} style={{ height: '1px' }} />
      </div>
      {visibleCountries.length < visibleCountriesCount && <button type="button" onClick={HandleGoingBackUp}>You have seen all the countries. Click here to go back up.</button>}      
    </>
  )

}

export default CountryFeed