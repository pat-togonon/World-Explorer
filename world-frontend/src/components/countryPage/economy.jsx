import { useEffect } from "react"
import { HandleGoingBackUp } from "../countryFeed"

const Gini = ({ gini }) => {
  const year = Object.keys(gini)
  const value = Object.values(gini)

  console.log(year, value)

  if (value >= 20 && value <= 29) {
    return (
      <>
        <h3>Wealth Equality: Very Equal (Gini Coefficient is {value} in {year})</h3>
        <p>Most people earn about the same. There's a strong middle class.</p>
        <p>You could work any decent job and still afford housing, healthcare, and weekend fun.</p>
      </>
    )
  }

  if (value >= 30 && value <= 39) {
    return (
      <>
        <h3>Wealth Equality: Moderate Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>There's a mix. Some are richer than others, but society still feels stable.</p>
        <p>There's visible wealth, but everyday life is decent for most.</p>
      </>
    )
  }

  if (value >= 40 && value <= 49) {
    return (
      <>
        <h3>Wealth Equality: Noticeable Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>The gap between rich and poor is clear. Wealth is concentrated.</p>
        <p>You might know someone with 3 cars and someone who skips meals — both in the same city.</p>
      </>
    )
  }

  if (value >= 50 && value <= 64) {
    return (
      <>
        <h3>Wealth Equality: High Inequality (Gini Coefficient is {value} in {year})</h3>
        <p>The rich are very rich. The poor are very poor. Big gap.</p>
        <p>Some live in mansions next to slums. It's harder to climb out of poverty.</p>
      </>
    )
  }

  if (value >= 65) {
    return (
      <>
        <h3>Wealth Equality: Extreme Inequality (Gini Coefficient is {value} in {year})</h3>
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

const Economy = ({ countryDetails }) => {

  if (!countryDetails.currencies && !countryDetails.gini) {
    return null
  }

  return (
    <>
      <h2>Economy</h2>
      {countryDetails.currencies && <Currency currencies={countryDetails.currencies} />}
      {countryDetails.gini && <Gini gini={countryDetails.gini} />}
    </>
  )
}

export default Economy