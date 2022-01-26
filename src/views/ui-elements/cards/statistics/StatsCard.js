// ** Third Party Components
import classnames from 'classnames'
import { User, Box } from 'react-feather'
import { Link } from 'react-router-dom'

// ** CSS import
import classes from './StatsCard.module.css'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const data = [
    {
      title: '1,5K',
      subtitle: 'Clients',
      color: 'light-primary',
      link: '/stats/audience',
      icon: <User size={24} />
    },
    {
      title: '8.549k',
      subtitle: 'Commandes',
      color: 'light-info',
      link: '/stats/shop',
      icon: <User size={24} />
    },
    {
      title: '1.423k',
      subtitle: 'Produits',
      color: 'light-danger',
      link: '/stats/shop',
      icon: <Box size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
            [classes['stat-element']]: true
          })}
        >
          <Link to={item.link} >
            <div className='d-flex align-items-center'>
              <Avatar color={item.color} icon={item.icon} className='me-2' />
              <div className='my-auto'>
                <h4 className='fw-bolder mb-0'>{item.title}</h4>
                <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
              </div>
            </div>
          </ Link>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h3' className={classes['card-title']}>Statistiques</CardTitle>
      </CardHeader>
      <CardBody className={classnames({[classes["stat-list-col"]]: true}, 'statistics-body')}>
        <Row className={classes["stat-list"]}>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
