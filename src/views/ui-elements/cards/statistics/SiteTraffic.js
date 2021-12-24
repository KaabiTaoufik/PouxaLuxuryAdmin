// ** React Imports
import {/* useEffect, */useState } from 'react'

// ** Third Party Components
//import axios from 'axios'
import { Monitor } from 'react-feather'

// ** Custom Components
import StatsWithLineChart from '@components/widgets/stats/StatsWithLineChart'

const SiteTraffic = () => {
  // ** State
  const [data/*, setData*/] = useState({
    series: [
      {
        name: "Site traffic",
        data: [
          {
            x: 1,
            y: 150
          }, 
          {
            x: 5,
            y: 200
          }, 
          {
            x: 10,
            y: 125
          }, 
          {
            x: 15,
            y: 225
          }, 
          {
            x: 20,
            y: 200
          },
          {
            x: 25,
            y: 250
          },
          {
            x: 30,
            y: 200
          }
        ]
      }
    ]
  })

  //useEffect(() => {
  //  axios.get('/card/card-statistics/site-traffic').then(res => setData(res.data))
  //  if (date === null) setData({ series: [{data: [150, 200, 125, 225, 200, 250, 200]}]}) 
  //}, [])

  
  return data !== null ? (
    <StatsWithLineChart
      icon={<Monitor size={21} />}
      link="/stats/audience"
      color='primary'
      stats='78.9k'
      statTitle='visiteurs (le mois dernier)'
      series={data.series}
      type='line'
    />
  ) : null
}

export default SiteTraffic
