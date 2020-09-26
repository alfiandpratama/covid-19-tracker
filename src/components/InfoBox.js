import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './infoBox.css'
import { prettyPrintStat } from '../utils'

function InfoBox({ title, active, isRed, cases, total, ...props }) {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          {prettyPrintStat(cases)}
        </h2>
        <Typography className='infoBox__total' color='textSecondary'>
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
