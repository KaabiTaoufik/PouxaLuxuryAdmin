// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** React Imports
import { useState } from 'react'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
//import axios from 'axios'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus, Eye, EyeOff, Edit, Trash } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardHeader,
  CardTitle
} from 'reactstrap'

// ** CSS 
import classes from './Categories.module.css'

/*
// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
  data = response.data
})
*/

const data = [
  {
    id: 1,
    name: "chaussures",
    image: "https://picsum.photos/100",
    order: 1,
    genres: ['homme', 'femme', 'enfant'],
    visibility: true
  },
  {
    id: 2,
    name: "pull",
    image: "https://picsum.photos/100",
    genres: ['homme', 'femme'],
    order: 2,
    visibility: false
  },
  {
    id: 3,
    name: "socks",
    image: "https://picsum.photos/100",
    genres: ['homme'],
    order: 3,
    visibility: true
  },
  {
    id: 4,
    name: "socks",
    image: "https://picsum.photos/100",
    genres: ['homme'],
    order: 4,
    visibility: true
  },
  {
    id: 5,
    name: "socks",
    image: "https://picsum.photos/100",
    genres: ['homme'],
    order: 5,
    visibility: true
  },
  {
    id: 6,
    name: "socks",
    image: "https://picsum.photos/100",
    genres: ['homme'],
    order: 6,
    visibility: true
  }
]

const Categories = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [rawData, setRawData] = useState(data)
  const MySwal = withReactContent(Swal)

  const handleConfirmVisibility = row => {
    const prefix = row.visibility  ? "in" : ""
    return MySwal.fire({
      title: `Vous allez rendre la catégorie ${row.name} ${prefix}visible au public`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        if (searchValue) setSearchValue('')
        const newData = rawData.map(cat => { if (cat.id === row.id) cat.visibility = !cat.visibility; return cat })
        setRawData(newData)
        MySwal.fire({
          icon: 'success',
          text: `${row.name} est ${prefix}visible au public`,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const handleConfirmDelete = row => {
    return MySwal.fire({
      title: `Vous allez supprimer la catégorie ${row.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer et supprimer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        const products = /*getProductsWithThatCategory*/ []
        if (products.length) {
          MySwal.fire({
            icon: 'error',
            title: "Erreur",
            text: `Il y a des produits avec cette catégorie. Rendez la invisible`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        } else {
          if (searchValue) setSearchValue('')
          const newData = rawData.filter(cat => cat.id !== row.id)
          setRawData(newData)
          MySwal.fire({
            icon: 'success',
            text: `${row.name} est supprimée avec succés`,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        }
      }
    })
  }


  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle Visibility toggle
  const handleVisibility = row => {
    handleConfirmVisibility(row)
  }

  // ** Function to handle Editing a row
  const handleEdit = row => {
    handleConfirmText(row)
  }

  // ** Function to handle Deleting a row 
  const handleDelete = row => {
    handleConfirmDelete(row)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = rawData.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase())
        const includes =
          item.name.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

    
// ** Table  Columns
const columns = [
  {
    name: 'ID',
    maxWidth: '30px',
    sortable: true,
    center: true,
    selector: row => row.id,
    cell: row => <p className={classes['cell-text']}>{row.id}</p>
  },
  {
    name: 'Nom',
    minWidth: '150px',
    sortable: true,
    selector: row => row.name,
    cell: row => <p className={classes['cell-text']}>{row.name}</p>
  },
  {
    name: 'Image',
    minWidth: '150px',
    center: true,
    cell: row => <img src={row.image} alt={row.name}/>
  },
  {
    name: 'Genre',
    minWidth: '150px',
    center: true,
    cell: row => {
      return (
        <div>
          {row.genres.map(genre => { 
            return (
              <div key={genre}>
                <div className={classes['cell-text']}>
                  {"- "}{genre}
                </div>
                <br/>
              </div>)
          })}
        </div>
      )
    }
  },
  {
    name: 'Ordre d\'apparition',
    minWidth: '50px',
    center: true,
    sortable: true,
    selector: row => row.order,
    cell: row => <p className={classes['cell-text']}>{row.order}</p>
  },
  {
    name: 'Visibilité',
    minWidth: '30px',
    center: true,
    cell: row => {
      if (row.visibility)  return <Eye className={classes.icon} size={20} onClick={() => handleVisibility(row)}/>
      return <EyeOff  className={classes.icon} size={20} onClick={() => handleVisibility(row)}/>
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    center: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <Edit  className={classes.icon} size={20} onClick={() => handleEdit(row)}/>
          <Trash  className={`${classes.icon}  ${classes.danger}`} size={20} onClick={() => handleDelete(row)} />
        </div>
      )
    }
  }
]


  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 5) : Math.ceil(rawData.length / 5) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  return (
    <>
      <Breadcrumbs 
        breadCrumbTitle='Catégories' 
        breadCrumbParent='E-commerce' 
        breadCrumbActive='Catégories' 
      />
      <Card>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Liste des Catégories</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Ajouter une catégorie</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
              placeholder='tapez içi pour chercher'
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={5}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : rawData}
          />
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </>
  )
}

export default Categories
