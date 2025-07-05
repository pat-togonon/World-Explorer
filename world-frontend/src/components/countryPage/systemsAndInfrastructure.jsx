// make the labels more child-friendly, what is dialing code root, top level domain, 
// add icons
// car animation? to show the driver side and road?
// comparison: “Unlike the US and most of Europe, Japan drives on the left side of the road.”
// comparison: “Japan is one of about 75 countries where drivers stay on the left side of the road.”



const SystemsAndInfrastructure = ({ countryDetails }) => {

  return (
    <>
      <h2>System and Infrastructure</h2>
      <p>When you call someone in {countryDetails.name.common}, {countryDetails.idd.root} is the number you start with.</p>
      <p>Websites from {countryDetails.name.common} usually end with {countryDetails.tld?.map(t => t).join(', or ')}.</p>
      <p>In {countryDetails.name.common}, drivers sit on the {countryDetails.car.side === 'right' ? 'left' : 'right'} side of the car and keep to the {countryDetails.car.side} side of the road.</p>
    </>
  )
}

export default SystemsAndInfrastructure