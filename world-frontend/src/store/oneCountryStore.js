import { create } from 'zustand'
import { fetchOneCountry } from '../service/countryService'

export const useOneCountryStore = create((set, get) => ({
  oneCountry: '',
  oneCountryDetails: [],
  setOneCountry: (country) => set({ oneCountry: country }),
  fetchOneCountry: async() => {
    const currentCountry = get().oneCountry
    console.log('one country store', currentCountry)
    
    const data = await fetchOneCountry(currentCountry)
    set({ oneCountryDetails: data })
  }
}))