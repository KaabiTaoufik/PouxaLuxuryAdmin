// ** React Imports
import { useState, useEffect } from "react"
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs"
import LoadingSpinner from "@components/spinner/Loading-spinner"
import CustomPagination from "@components/custom-pagination"
import CategoryModal from "./CategoryModal"
import { useSkin } from "@hooks/useSkin"
import { useHttp } from "@hooks/useHttp"
import { useModal } from "@hooks/useModal"
import { getColumns } from "./TableSchema"
// ** Third Party Components
import {Row, Col, Card, Input, Label, Button, CardHeader, CardTitle} from "reactstrap"
import DataTable from "react-data-table-component"
import { ChevronDown, Plus } from "react-feather"
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "animate.css/animate.css"
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss"

const Categories = () => {
  const [data, setData] = useState([])
  const [update, setUpdate] = useState(0)
  const [dataCount, setDataCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [limitIsChangd, setLimitIsChanged] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [firstTime, setFirstTime] = useState(true)
  const [modal, dispatchModal] = useModal()
  const [isLoading, error, sendRequest/*, clearError*/] = useHttp()
  const { skin } = useSkin()

  useEffect(() => {
    const getDataTimer = setTimeout(async () => {
      try {
        if (limitIsChangd) { setPage(1); setLimitIsChanged(false); return }
        const response = await sendRequest(
          `http://localhost:5000/api/categories?page=${page}&limit=${limit}&q=${encodeURIComponent(
            searchValue
          )}`
        )
        setData(response.data.categories)
        setDataCount(parseInt(response.data.totalCount))
        if (firstTime) setFirstTime(false)
      } catch (err) {
        console.log(error)
      }
    }, 400)
    return () => clearTimeout(getDataTimer)
  }, [page, limit, searchValue, limitIsChangd, update])

  const handleModal = () => dispatchModal({ type: modal.open ? "CLOSE" : "OPEN" })

  // ** Function to handle filter
  const handleFilter = e => setSearchValue(e.target.value)

  // ** Function to handle Pagination and get data
  const handlePagination = page => setPage(page.selected + 1)

  // ** Function to handle per page
  const handleLimit = e => { setLimit(parseInt(e.target.value)); setLimitIsChanged(true) }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Catégories"
        breadCrumbParent="E-commerce"
        breadCrumbActive="Catégories"
      />
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h3" style={{ fontSize: "1.5rem" }}>
            Liste des Catégories
          </CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Ajouter une catégorie</span>
            </Button>
          </div>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Label for="sort-select">afficher</Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={limit}
                onChange={e => handleLimit(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Input>
              <Label for="sort-select">élements</Label>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            <Label className="me-1" for="search-input">
              Rechercher
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable app-dataTable">
          {isLoading ? (
            <>
              <br />
              <LoadingSpinner />
              <br />
            </>
          ) : (
            <DataTable
              noHeader
              pagination
              paginationServer
              className="react-dataTable"
              columns={getColumns(dispatchModal, setUpdate)}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={ () => {
                return (
                  <CustomPagination 
                  page={page} 
                  limit={limit} 
                  dataCount={dataCount} 
                  handlePagination={handlePagination}
                />
                )
              }}
              noDataComponent={!firstTime && <p>no Category found</p>}
              data={data}
              {...(skin === "light" ? { highlightOnHover: true } : {})}
            />
          )}
        </div>
      </Card>
      <CategoryModal
        open={modal.open}
        modal={modal}
        handleModal={handleModal}
        setUpdate={setUpdate}
        {...(modal.edit ? { edit: true, category: modal.category } : {})}
      />
    </>
  )
}

export default Categories
