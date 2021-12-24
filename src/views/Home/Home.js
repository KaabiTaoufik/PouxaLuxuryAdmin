// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap"

// ** Custom Components
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard"
import SiteTraffic from "@src/views/ui-elements/cards/statistics/SiteTraffic"
import TopSellingItems from "@src/views/ui-elements/TopSellingItems"
import NewOrders from "@src/views/ui-elements/NewOrders"

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss"

const Home = () => {
  return (
    <div id="home-page">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <SiteTraffic />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "4", sm: "6" }} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="6" ms="12">
          <TopSellingItems />
        </Col>
        <Col lg="6" ms="12">
            <Col ms="12">
                <NewOrders />
            </Col>
            <Col ms="12">
              <Card className="card-top-selling">
                <CardHeader>
                  <CardTitle tag="h4">Les produits les plus aimés</CardTitle>
                </CardHeader>
                <CardBody className="top-selling-body">
                    <div>hello</div>
                </CardBody>
              </Card>
            </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Home
