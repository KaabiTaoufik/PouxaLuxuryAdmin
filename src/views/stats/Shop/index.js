// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import CategoriesChart from "@src/views/ui-elements/stats/CategoriesChart/"
import TypesChart from "@src/views/ui-elements/stats/TypesChart/"
import OrdersChart from "@src/views/ui-elements/stats/OrdersChart/"
import { Row, Col } from 'reactstrap'
import '@styles/react/libs/charts/apex-charts.scss'

const Shop = () => {
  return (
    <>
      <Breadcrumbs 
        breadCrumbTitle='Produits & Achats' 
        breadCrumbParent='Statistiques' 
        breadCrumbActive='Produits & Achats' 
      />
      <Row className='match-height'>
          <Col sm='6'>
            <CategoriesChart />
          </Col>
          <Col sm='6'>
            <TypesChart />
          </Col>
      </Row>
      <Row className='match-height'>
        <Col sm='12'>
          <OrdersChart />
        </Col>
      </Row>
    </>
  )
}

export default Shop
