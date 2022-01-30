// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import VisitorsChart from "../../ui-elements/stats/VisitorsChart/"
import ClientsChart from "../../ui-elements/stats/ClientsChart/"
import { Row, Col } from 'reactstrap'
import '@styles/react/libs/charts/recharts.scss'

const Audience = () => {

  return (
    <>
      <Breadcrumbs 
        breadCrumbTitle='Audience' 
        breadCrumbParent='Statistiques' 
        breadCrumbActive='Audience' 
      />
      <Row className='match-height'>
          <Col sm='12'>
            <VisitorsChart />
          </Col>
      </Row>
      <Row className='match-height'>
          <Col sm='12'>
            <ClientsChart />
          </Col>
      </Row>
    </>
  )
}

export default Audience
