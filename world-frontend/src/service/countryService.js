import axios from "axios"

const url = import.meta.env.VITE_BASEURL

export const fetchOneCountry = async (countryToSearch) => {

  const response = await axios.get(`${url}/name/${countryToSearch}`)
  return response.data

}

export const fetchAllCountry = async () => {

  const response = await axios.get(`${url}/all`)

  return response.data

}