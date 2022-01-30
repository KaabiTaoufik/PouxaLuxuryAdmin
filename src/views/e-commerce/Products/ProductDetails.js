// ** React Imports
/* import { useState } from 'react' */
import {Row, Col, CardText, Label, Input, Button} from 'reactstrap'

const ProductDetails = () => {

/*   const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState(0) */

  const data = {
    name:"Iphone 13 - (5G 125Go stockage 16Go RAM)", 
    brand:" Apple", 
    image:"https://imtc.qccdn.fr/test/smartphone/zoom/apple-iphone-12_001.jpg",
    description: "hhhhhhhh iphone iphone hhhhhhhhh hhehhe hahah hohohoo",
    price: 999.999,
    stock:[
      {
        color: "black",
        sizes: [
          {
            size: "xl",
            quantity: 17
          }
        ]
      }
    ]
  }

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={data.image} alt={data.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.name}</h4>
        <CardText tag='span' className='item-company'>
          By
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {data.brand}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price me-1'>Prix : {data.price} DT</h4>
        </div>
        <CardText>
          Status : <span className='text-success ms-25'>In stock</span>
        </CardText>
        <CardText>{data.description}</CardText>
        <hr />
        <div className="d-flex">
          <div className="me-2">
            <Label className="me-1" for="color-select">Couleur</Label>
            <Input
                style={{width:90}}
                type="select"
                id="color-select"
                value={data.stock[0].color}
                onChange={e => e.preventDefault()}
            >
              {data.stock.map(el => <option key={el.color} value={el.color}>{el.color}</option>)}
            </Input>
          </div>
          <div className="me-2">
            <Label className="me-1" for="size-select">taille</Label>
            <Input
                style={{width:90}}
                type="select"
                id="size-select"
                value={data.stock[0].sizes[0].size}
                onChange={e => e.preventDefault()}
            >
              {data.stock[0].sizes.map(el => <option key={el.size} value={el.size}>{el.size}</option>)}
            </Input>
          </div>
        </div>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button className='me-0 me-sm-1 mb-1 mb-sm-0' color='primary'>
            Modifier
          </Button>
          <Button className='me-0 me-sm-1 mb-1 mb-sm-0' color='success' outline>
            rendre invisible
          </Button>
          <Button className='me-0 me-sm-1 mb-1 mb-sm-0' color='danger'>
            Supprimer
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetails
