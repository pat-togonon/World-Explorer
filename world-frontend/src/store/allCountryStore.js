import { create } from "zustand"
import { fetchAllCountry } from "../service/countryService"


export const useAllCountryStore = create((set) => ({
  allCountries: [],
  fetchCountries: async () => {
    const data = await fetchAllCountry()
    set({ allCountries: data.sort((a, b) => a.cca3.localeCompare(b.cca3)) })
  },

}))