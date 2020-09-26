import React, { useEffect, useState } from 'react'
import InfoList from './components/InfoList'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import './App.css'
import { sortData } from './utils'
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  const [mapCenter, setMapCenter] = useState({ lat: -5, lng: 120 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])

  useEffect(() => {
    const getAllCountries = async () => {
      const res = await window.fetch('https://disease.sh/v3/covid-19/all')
      const data = await res.json()

      setCountryInfo(data)
    }

    getAllCountries()
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      const res = await window.fetch(
        'https://disease.sh/v3/covid-19/countries'
      )
      const data = await res.json()
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2
      }))

      setTableData(sortData(data))
      setMapCountries(data)
      setCountries(countries)
    }

    getCountries()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const res = await window.fetch(url)
    const data = await res.json()

    setCountry(countryCode)
    setCountryInfo(data)

    setMapCenter([data.countryInfo.lat, data.countryInfo.long])
    setMapZoom(4)
  }

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.name} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* InfoList Component */}
      <InfoList
        countryInfo={countryInfo}
        casesType={casesType}
        setCasesType={setCasesType}
      />

      <div className='app__sidebar'>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        <LineGraph casesType={casesType} />
      </div>
      <div className='app__map'>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  )
}

export default App
