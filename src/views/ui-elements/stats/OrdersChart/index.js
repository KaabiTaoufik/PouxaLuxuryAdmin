// ** Third Party Components
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody, CardText, Label, Input } from 'reactstrap'
import { useContext, useState, useEffect } from 'react'
import {useHttp} from "@hooks/useHttp"
import {kFormatter} from "@utils"
import LoadingSpinner from "@components/spinner/Loading-spinner"
import { ThemeColors } from '@src/utility/context/ThemeColors'

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

const OrdersChart = () => {

    const [year, setYear] = useState(new Date().getFullYear())
    const [years, setYears] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [series, setSeries] = useState([])
    const [isLoading, /* error, */, sendRequest/*, clearError*/] = useHttp()
    const context = useContext(ThemeColors)
    const color = context.colors.primary.main

    useEffect(() => {
        const getSeries = async () => {
          try {
            const response = await sendRequest(`http://localhost:5000/api/stats/orders?year=${year}`)
            setSeries([{name:"commandes", data: response.data.series}])
            setYears(response.data.years)
            setTotalCount(response.data.totalCount)
          } catch (err) {
            console.log(err)
          }
        }
        getSeries()
    }, [year])

    const handleYearChange = (e) => setYear(e.target.value)


    const options = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        dropShadow: {
          enabled: true,
          top: 18,
          left: 2,
          blur: 5,
          opacity: 0.2
        },
        offsetX: -10
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      grid: {
        borderColor: '#ebe9f1',
        padding: {
          top: -20,
          bottom: 5,
          left: 20
        }
      },
      legend: {
        show: false
      },
      colors: ['#df87f2'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          inverseColors: false,
          gradientToColors: [color],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          offsetY: 5,
          style: {
            colors: '#b9b9c3',
            fontSize: '0.857rem',
            fontFamily: 'Montserrat'
          }
        },
        axisTicks: {
          show: false
        },
        categories: MONTHS,
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.857rem',
            fontFamily: 'Montserrat'
          },
          formatter(val) {
            return kFormatter(val)
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    }

  return (
    <Card>
      <CardHeader className='align-items-start'>
        <div>
          <CardTitle className='mb-25' tag='h4'>
            Les Commandes
          </CardTitle>
          <CardText className='mb-0'>{`Nombre total: ${kFormatter(totalCount)}`}</CardText>
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
      <CardBody className='pb-0'>
        {isLoading ? <LoadingSpinner /> : <Chart options={options} series={series} type='line' height={300} />}
      </CardBody>
    </Card>
  )
}
export default OrdersChart
