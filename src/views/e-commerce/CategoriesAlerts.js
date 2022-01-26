import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import axios from "axios"

const MySwal = withReactContent(Swal)

export const handleConfirmVisibility = (row, setUpdate) => {
    const prefix = row.visibility ? "in" : ""
    row.visibility = !row.visibility
    return MySwal.fire({
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
            await axios.patch(`http://localhost:5000/api/categories/${row._id}`, row)
            setUpdate(prev => prev + 1)
          } catch (error) {
            if (error.response.status === 404) error = "cette catégorie n'existe pas"
            else error = "une erreur est survenue veuillez réessayer "
            MySwal.showValidationMessage(`${error}`)
          }
          return true
      }
    }).then(result => {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          text: `La catégorie "${row.name}" est ${prefix}visible au public`,
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
      }
    })
  }

export const handleConfirmDelete = (row, setUpdate) => {
    return MySwal.fire({
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
          const products = await axios.get(`http://localhost:5000/api/products?cat=${row._id}`)
          return products.data.data.length
        } catch (error) {
          if (error.response.status === 404) error = "cette catégorie n'existe pas"
          else error = "une erreur est survenue veuillez réessayer "
          MySwal.showValidationMessage(`${error}`)
        }
    }
    }).then(async result => {
      if (result.value) {
          MySwal.fire({
            icon: "error",
            title: "Erreur",
            text: `Il y a des produits avec cette catégorie. Rendez la invisible`,
            customClass: {
              confirmButton: "btn btn-success"
            }
          })
     } else {
         try {
            await axios.delete(`http://localhost:5000/api/categories/${row._id}`)
            setUpdate(prev => prev + 1)
            MySwal.fire({
                icon: "success",
                text: `${row.name} est supprimée avec succés`,
                customClass: {
                  confirmButton: "btn btn-success"
                }
              })
         } catch (error) {
            if (error.response.status === 404) error = "cette catégorie n'existe pas"
            else error = "une erreur est survenue veuillez réessayer "
            MySwal.showValidationMessage(`${error}`)
        }
      }
    }
    )
}


export const handleOnSubmit = async (e, modal, handleModal, setUpdate) => {
    e.preventDefault()
    const obj = {
      name: e.target.name.value,
      visibility: e.target.visibility.checked,
      order: e.target.order.value,
      image: e.target.image.value
    }
    try {
        if (modal.edit) {
            obj._id = e.target._id.value
            await axios.patch(`http://localhost:5000/api/categories/${obj._id}`, obj)
        } else await axios.post(`http://localhost:5000/api/categories`, obj)
        setUpdate(prev => prev + 1)
        return MySwal.fire({
            title: "Form submitted!",
            text: "hhh",
            icon: "success",
            customClass: {
            confirmButton: "btn btn-primary"
            },
            buttonsStyling: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(function (result) {
            if (result.value) handleModal()
        })
    } catch (error) {
        return MySwal.fire({
            title: "Warning!",
            text: " You clicked the button!",
            icon: "warning",
            customClass: {
              confirmButton: "btn btn-primary"
            },
            buttonsStyling: false
          })
    }
  }
