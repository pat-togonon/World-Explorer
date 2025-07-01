import axios from "axios"

export const fetchOneCountry = async (countryToSearch) => {

  const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryToSearch}`)
  return response.data

}

export const fetchAllCountry = async () => {

  const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')

  return response.data

}