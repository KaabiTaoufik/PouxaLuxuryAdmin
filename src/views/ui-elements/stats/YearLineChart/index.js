// ** Third Party Components
import {useState, useEffect} from 'react'
import { useHttp } from "@hooks/useHttp"
import {kFormatter} from "@utils"
import { Card, CardHeader, CardTitle, CardText, CardBody, CardSubtitle, Input, Label } from 'reactstrap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import LoadingSpinner from "@components/spinner/Loading-spinner"

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novombre',
  'Décembre'
]

const YearLineChart = ({ title, dataUrl, color }) => {

  const [series, setSeries] = useState([])
  const [years, setYears] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, /* error, */, sendRequest/*, clearError*/] = useHttp()

  useEffect(() => {
      const getSeries = async () => {
        try {
          const response = await sendRequest(`${dataUrl}?year=${year}`)
          response.data.series = response.data.series.map((el, index) => { 
            return {month: MONTHS[index], pv: el}
          })
          setSeries(response.data.series)
          setYears(response.data.years)
        } catch (err) {
          console.log(err)
        }
      }
      getSeries()
  }, [year])


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload) {
      return (
        <div className='recharts-custom-tooltip'>
          <span>{`${payload[0].value} ${title}`}</span>
        </div>
      )
    }
    return null
  }

  const handleYearChange = (e) => setYear(e.target.value)

  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            {`Les ${title}`}
          </CardTitle>
          <CardText className='mb-0'>{`Nombre total: ${kFormatter(12800)}`}</CardText>
        </div>
        <div className='d-flex align-items-center flex-wrap mt-sm-0'>
            <div className="d-flex align-items-center">
              <Label className="me-1" for="year-select">Année</Label>
              <Input
                style={{width:90}}
                type="select"
                id="year-select"
                value={year}
                onChange={handleYearChange}
              >
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </Input>
            </div>
        </div>
      </CardHeader>
      <CardBody>
        { isLoading && <LoadingSpinner /> }
        { !isLoading && 
          <div className='recharts-wrapper'>
            <ResponsiveContainer>
              <LineChart height={350} data={series}>
                <CartesianGrid />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Line type="monotone" dataKey='pv' stroke={color} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        }
      </CardBody>
    </Card>
  )
}

export default YearLineChart
