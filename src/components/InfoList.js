import React from 'react'
import InfoBox from './InfoBox'

function InfoList({ countryInfo, casesType, setCasesType }) {
  return (
    <div className='app__infoList'>
      <InfoBox
        isRed
        onClick={(e) => setCasesType('cases')}
        title='Coronavirus Cases'
        active={casesType === 'cases'}
        cases={countryInfo.todayCases}
        total={countryInfo.cases}
      />
      <InfoBox
        onClick={(e) => setCasesType('recovered')}
        title='Recovered'
        active={casesType === 'recovered'}
        cases={countryInfo.todayRecovered}
        total={countryInfo.recovered}
      />
      <InfoBox
        isRed
        onClick={(e) => setCasesType('deaths')}
        title='Deaths'
        active={casesType === 'deaths'}
        cases={countryInfo.todayDeaths}
        total={countryInfo.deaths}
      />
    </div>
  )
}

export default InfoList
