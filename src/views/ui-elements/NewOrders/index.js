import { Card, CardBody, Button, CardHeader, CardTitle, Table} from 'reactstrap'
import { Link } from "react-router-dom"

const NewOrders = () => {

    const orders = [
        {
            id: "1",
            client: {name: "mohamed"},
            numTel: 123456789
        },
        {
            id: "1",
            client: {name: "mohamed"},
            numTel: 1235678
        },        
        {
            id: "1",
            client: {name: "mohamed"},
            numTel: 12345678
        }
    ]

    const renderTable = () => {
        return (
        <Table responsive>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Client</th>
                    <th>num° tel</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {(orders.length > 0) && orders.map(order => {
                    return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.client.name}</td>
                        <td>{order.numTel}</td>
                        <td>
                            <Link to={`/commande/${order.id}`} >
                                <Button color='gradient-primary' style={{fontSize:'9px'}}>Détails</Button>
                            </Link>
                        </td>
                    </tr>
                    )
                })
                }
            </tbody>
        </Table>
        )
    }

  return (
    <Card className="card-new-orders">
        <CardHeader>
            <Link to='/commandes' style={{cursor: "pointer" }}>
                <CardTitle tag="h4">
                    Nouvelles commandes
                </CardTitle>
            </Link>
        </CardHeader>
        <CardBody className="new-orders-body">
            {renderTable()}
        </CardBody>
    </Card>
  )
}

export default NewOrders