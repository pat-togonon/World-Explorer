// Add in an icon that says see coat of arms in full ? 
// Add a toolkit thing (pop up when clicked) that explains what it means to be a member of UN
// Tooltip for coat of arms also


const UnitedNationMember = ({ UN }) => {

  return (
    <>
      <img src={UN ? '/UN.svg' : '/non-UN.svg'} />
      <p>{UN ? '' : 'Not a '}Member of the United Nations</p>
    </>
  )
}

const Overview = ({ countryDetails }) => {

  console.log('coat', countryDetails.coatOfArms.svg)
  return (
    <>
      <h2>Overview</h2>  
      <h3>Flag</h3>
      <img src={countryDetails.flags.png} />  
      <div className="country-page-overview">
        <div>
          {countryDetails.independent ? <img src={countryDetails.coatOfArms.png} className="country-page-coat-of-arms-svg" /> : <img src='/non-coat.svg' />}
          <p>{countryDetails.independent ? "Independent country" : "Not fully independent"}</p>
        </div>
        <div>
          <UnitedNationMember UN={countryDetails.unMember} />
        </div>
      </div>
      <p>{!countryDetails.independent && "This region or territory is not fully independent. It's governed or administered by another country."}</p>
      <p>Alternative names: {countryDetails.altSpellings.map(a => a).join(', ')}</p>
      </>
  )
}

export default Overview