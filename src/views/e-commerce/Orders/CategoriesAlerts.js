import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import axios from "axios"

const MySwal = withReactContent(Swal)

export const handleConfirmVisibility = async (row, setUpdate) => {
  const prefix = row.visibility ? "in" : ""
  row.visibility = !row.visibility
  const result = await MySwal.fire({
    title: `Vous allez rendre la catégorie "${row.name}" ${prefix}visible au public`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirmer",
    cancelButtonText: "Annuler",
    showLoaderOnConfirm: true,
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ms-1"
    },
    buttonsStyling: false,
    preConfirm: async () => {
      try {
        await axios.patch(`http://localhost:5000/api/categories/${row._id}`, {...row, mode: "EDIT"})
        setUpdate(prev => prev + Math.random())
        return true
      } catch (error) {
        if (error.response.status === 404) error = "cette catégorie n'existe pas"
        else error = "une erreur est survenue veuillez réessayer "
        MySwal.showValidationMessage(`${error}`)
      }
    }
  })
  if (result.value) {
    MySwal.fire({
      icon: "success",
      text: `La catégorie "${row.name}" est ${prefix}visible au public`,
      customClass: {confirmButton: "btn btn-success"}
    })
  }
}

export const handleConfirmDelete = async (row, setUpdate) => {
  const result = await MySwal.fire({
    title: `Vous allez supprimer la catégorie ${row.name}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirmer et supprimer",
    cancelButtonText: "Annuler",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ms-1"
    },
    buttonsStyling: false,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/products?category=${row._id}`)
        return data.data.products.length
      } catch (error) {
        if (error.response.status === 404) error = "cette catégorie n'existe pas"
        else error = "une erreur est survenue veuillez réessayer "
        MySwal.showValidationMessage(`${error}`)
      }
    }
  })
  if (result.isConfirmed) {
    if (result.value) {
      MySwal.fire({
        icon: "error",
        title: "Erreur",
        text: `Il y a des produits avec cette catégorie. Rendez la invisible`,
        customClass: {confirmButton: "btn btn-success"}
      })
    } else {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${row._id}`)
        setUpdate(prev => prev + Math.random())
        MySwal.fire({
          icon: "success",
          text: `${row.name} est supprimée avec succés`,
          customClass: {confirmButton: "btn btn-success"}
        })
      } catch (error) {
        if (error.response.status === 404) error = "cette catégorie n'existe pas"
        else error = "une erreur est survenue veuillez réessayer "
        MySwal.showValidationMessage(`${error}`)
      }
    }  
  }
}
