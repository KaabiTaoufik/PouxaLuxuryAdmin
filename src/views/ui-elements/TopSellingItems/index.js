 // ** React Imports
import { Link } from 'react-router-dom'
//import { useState } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Button, CardHeader, CardTitle, Badge} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'

import classes from './TopSellingItems.module.css'


const TopSellingItems = (/*{ products }*/) => {

 //const [data, setData] = useState(products)

 //if (data === []) { 
  // setData([
    const data = [
       {
        ref:"A",
        name:"prfdfsdfefzefefefefdszfzazeazezaeazezefzefzeodA",
        cat:[{name:"x"}],
        image:"https://picsum.photos/200", 
        price:"500", 
        description:"abcd" 
      },
      {
        ref:"B",
        name:"prodB", 
        cat:[{name:"y"}],
        image:"https://picsum.photos/200", 
        price:"600", 
        description:"efgh" 
      },
      {
        ref:"C",
        name:"prodC", 
        cat:[{name:"z"}, {name:"x"}],
        image:"https://picsum.photos/200", 
        price:"700", 
        description:"ijkl" 
      }
    ]
  //  ]) 


  // ** Renders products
  const renderProducts = () => {
    if (data.length) {
      return data.map((item, index) => {
          const link = `/produit/${item.ref}`
        return (
          <div key={item.name} >
            <Card className={classes["top-selling-item"]} >
              <div className={classes["item-wrapper"]}>
                <div className={classes['item-img']}>
                  <Link to={link}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                </div>
                <div className={classes['item-desc']}>
                  <div className={classes['item-name']}>
                    <Link className='text-body' to={link}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className={classes['item-ref']}>
                    <Link className='text-body' to={link}>
                      #{item.ref}
                    </Link>
                  </div>
                  <div className={classes['item-category']}>
                    {item.cat.map(category => <><Badge key={category.name} color='light-secondary'>{category.name}</Badge>{" "}</>)}
                  </div>
                </div>
              </div>
              <div className={classes['details-wrapper']}>
                <div className={classes['price-wrapper']}>
                  <p className={classes['price']}>{item.price}</p>
                  <span className={classes["devise"]}>TND</span>
                </div>
                <div className={classes["details"]}>
                  <Link className='text-body' to={link}>
                    <Button color='gradient-primary'><FontAwesomeIcon icon={faPlus}/> {" "}Détails</Button>
                  </Link>
                </div>
              </div>
            </Card>
            {(index < (data.length - 1)) && <hr />}
          </div>
        )
      })
    }
    return <p>il n'y a pas encore de commandes</p>
  }
  
  return (
    <Card className='card-top-selling'>
      <CardHeader>
        <CardTitle tag='h4'>Les produits les plus aimés</CardTitle>
      </CardHeader>
      <CardBody className='top-selling-body'>
        {renderProducts()}
      </CardBody>
    </Card>
  )
}

export default TopSellingItems
