/* // ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom' */
import ProductDetails from './ProductDetails'
import BreadCrumbs from '@components/breadcrumbs'
import { Card, CardBody } from 'reactstrap'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
/*   // ** Vars
  const params = useParams().product
  const productId = params.substring(params.lastIndexOf('-') + 1) */

  return (
    <>
      <BreadCrumbs 
        breadCrumbTitle='Product Details' 
        breadCrumbParent='eCommerce' 
        breadCrumbActive='Details' 
      />
      <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
              <ProductDetails />
            </CardBody>
          </Card>
      </div>
    </>
  )
}

export default Details
