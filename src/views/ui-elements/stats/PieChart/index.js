// ** Third Party Components
import Chart from 'react-apexcharts'
import {useState, useEffect} from 'react'
import {useHttp} from "@hooks/useHttp"
import {kFormatter} from "@utils"
import LoadingSpinner from "@components/spinner/Loading-spinner"
import { Card, CardHeader, CardTitle, CardBody, ButtonGroup, Button, CardText } from 'reactstrap'

const TYPE_COLORS = ["#4c3f91", "#ff5677", "#4fbdba"]
const COLORS = [
  '#94B5C0', 
  '#350B40', 
  '#AD6C80', 
  '#EE99A0', 
  '#C4FB6D', 
  "#EDC988", 
  "#D7385E", 
  "#132743", 
  "#4F8A8B",
  "#BAFFB4"
]

const PieChart = ({title, dataUrl}) => {

    const [isLoading, /* error, */, sendRequest/*, clearError*/] = useHttp()
    const [series, setSeries] = useState([])
    const [names, setNames] = useState([])
    const [filter, setFilter] = useState("onStock")

    useEffect(() => {
        const getSeries = async () => {
          try {
            const response = await sendRequest(`${dataUrl}?filter=${filter}`)
            setNames(response.data.series.map(el => el.name))
            setSeries(response.data.series.map(el => el.count))
          } catch (err) {
            console.log(err)
          }
        }
        getSeries()
    }, [filter])

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: names,

    colors: (title.toLowerCase() === "types") ? TYPE_COLORS : COLORS,
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)} produits`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'total :',
              formatter() {
                return `${names.length} ${title}`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
        <div>
          <CardTitle tag='h4'>{`Les ${title}`}</CardTitle>
          <CardText className='mb-0'>{`Nombre total: ${kFormatter(12800)}`}</CardText>
        </div>
        <ButtonGroup className='mt-md-0 mt-1'>
          <Button active={filter === 'onStock'} color='primary' outline onClick={() => setFilter('onStock')}>
            En stock
          </Button>
          <Button active={filter === 'ordered'} color='primary' outline onClick={() => setFilter('ordered')}>
            {`Commandé${title === "types" ? "" : "e"}s`}
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
          {isLoading ? <LoadingSpinner /> : <Chart options={options} series={series} type='donut' height={350} />}
      </CardBody>
    </Card>
  )
}

export default PieChart
