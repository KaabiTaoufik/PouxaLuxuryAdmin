// ** React Imports
import { Fragment, useState, memo, useEffect } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus, Eye, EyeOff, Edit, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import axios from 'axios'
// ** Custom Imports
import Breadcrumbs from '@components/breadcrumbs'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


const DataTableServerSide = () => {

  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories?page=${page}&limit=${limit}&q=${searchValue}`)
        setData(response.data.categories)
        setDataCount(response.totalCount)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
}, [page, limit, searchValue])


// ** Table  Columns
const columns = [
  {
    name: 'Nom',
    minWidth: '150px',
    sortable: true,
    selector: row => row.name,
    cell: row => <p className="cell-text" >{row.name}</p>
  },
  {
    name: 'Image',
    minWidth: '150px',
    center: true,
    cell: row => <img className="categorie s-img" src={row.image} alt={row.name}/>
  },
  {
    name: 'Ordre d\'affichage',
    minWidth: '50px',
    center: true,
    sortable: true,
    hide: 'sm',
    selector: row => row.order,
    cell: row => <p className='cell-text'>{row.order}</p>
  },
  {
    name: 'Visibilité',
    minWidth: '50px',
    hide: 'sm',
    center: true,
    cell: row => {
      if (row.visibility)  return <Eye className='icon' size={20} onClick={() => handleVisibility(row)}/>
      return <EyeOff  className='icon' size={20} onClick={() => handleVisibility(row)}/>
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    center: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <Edit  className='icon' size={20} onClick={() => handleEdit(row)}/>
          <Trash  className='icon danger' size={20} onClick={() => handleDelete(row)} />
        </div>
      )
    }
  }
]

  // ** Function to handle filter
  const handleFilter = async e => {
    setSearchValue(e.target.value)
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    setPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handleLimit = e => {
    setLimit(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(dataCount / limit)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        activeClassName='active'
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    if (data.length > 0) return data
    return []
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h3' style={{fontSize:"1.5rem"}}>Liste des Catégories</CardTitle>
        </CardHeader>
        <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Ajouter une catégorie</span>
            </Button>
          </div>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>afficher</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={limit}
                onChange={e => handleLimit(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Input>
              <Label for='sort-select'>élements</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Rechercher
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable app-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            className='react-dataTable'
            columns={columns}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            {...(skin === 'light' ? {highlightOnHover: true} : {})}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default memo(DataTableServerSide)
