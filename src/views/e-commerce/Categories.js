// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import { useSkin } from '@hooks/useSkin'
// ** React Imports
import { useState } from 'react'
// ** Add New Modal Component
import AddNewModal from './AddNewModal'
// ** Third Party Components
//import axios from 'axios'
import {Row, Col, Card, Input, Label, Button, CardHeader, CardTitle} from 'reactstrap'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus, Eye, EyeOff, Edit, Trash } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

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
    visibility: true
  },
  {
    id: 2,
    name: "pull",
    image: "https://picsum.photos/100",
    order: 2,
    visibility: false
  },
  {
    id: 3,
    name: "socks",
    image: "https://picsum.photos/100",
    order: 3,
    visibility: true
  },
  {
    id: 4,
    name: "socks",
    image: "https://picsum.photos/100",
    order: 4,
    visibility: true
  },
  {
    id: 5,
    name: "socks",
    image: "https://picsum.photos/100",
    order: 5,
    visibility: true
  },
  {
    id: 6,
    name: "socks",
    image: "https://picsum.photos/100",
    order: 3,
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
  const { skin } = useSkin()
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

  const handleModal = () => setModal(!modal)

  const handleVisibility = row => {
    handleConfirmVisibility(row)
  }

  const handleEdit = row => {
    handleConfirmText(row)
  }

  const handleDelete = row => {
    handleConfirmDelete(row)
  }

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = rawData.filter(item => {
        const startsWith = item.name.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.name.toLowerCase().includes(value.toLowerCase())

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
    
// ** Table  Columns
const columns = [
  {
    name: 'ID',
    maxWidth: '25px',
    sortable: true,
    hide: 'sm',
    center: true,
    selector: row => row.id,
    cell: row => <p className='cell-text'>{row.id}</p>
  },
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
        <div className='react-dataTable app-dataTable'>
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
            {...(skin === 'light' ? {highlightOnHover: true} : {})}
          />
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </>
  )
}

export default Categories
