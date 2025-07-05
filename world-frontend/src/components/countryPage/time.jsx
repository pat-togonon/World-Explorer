
const WeekStart = ({ day }) => {
  const formattedDay = day.charAt(0).toUpperCase() + day.slice(1)
  
  return <p>Week starts on a {formattedDay}.</p>
}

const TimezoneAndWeekStart = ({ countryDetails }) => {
// add weather data and air quality?
// add a live clock (current time in first timezone)
//add icons (calendar, clock, etc)

  return (
    <>
      <h2>Timezone, Week Start and Weather</h2>
      <p>Timezones: {countryDetails.timezones.map(t => t).join(', ')}</p>
      <WeekStart day={countryDetails.startOfWeek} />
    </>
  )

}

export default TimezoneAndWeekStart