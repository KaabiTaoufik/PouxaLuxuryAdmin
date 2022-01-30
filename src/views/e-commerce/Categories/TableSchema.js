import { Eye, EyeOff, Edit, Trash } from "react-feather"
import { handleConfirmVisibility, handleConfirmDelete } from "./CategoriesAlerts"

  const handleEdit = (row, dispatchModal) => dispatchModal({ type: "EDIT", edit: true, category: row })
  
  const handleVisibility = (row, setUpdate) => handleConfirmVisibility(row, setUpdate)
  
  const handleDelete = (row, setUpdate) => handleConfirmDelete(row, setUpdate)


export const getColumns = (dispatchModal, setUpdate) => {
    return  [
      {
        name: "Nom",
        minWidth: "150px",
        sortable: true,
        selector: (row) => row.name,
        cell: (row) => <p className="cell-text">{row.name}</p>
      },
      {
        name: "Image",
        minWidth: "150px",
        center: true,
        cell: (row) => (
          <img className="categorie s-img" crossOrigin="anonymous" style={{maxHeight:150, maxWidth:150}}src={row.image} alt={row.name} />
        )
      },
      {
        name: "Ordre d'affichage",
        minWidth: "50px",
        center: true,
        sortable: true,
        hide: "sm",
        selector: (row) => row.order,
        cell: (row) => <p className="cell-text">{row.order}</p>
      },
      {
        name: "Visibilité",
        minWidth: "50px",
        hide: "sm",
        center: true,
        cell: (row) => {
          if (row.visibility) return <Eye className="icon" size={20} onClick={() => handleVisibility(row, setUpdate)}/>
          return <EyeOff className="icon" size={20} onClick={() => handleVisibility(row, setUpdate)}/>
        }
      },
      {
        name: "Actions",
        allowOverflow: true,
        center: true,
        cell: (row) => {
          return (
            <div className="d-flex">
              <Edit className="icon" size={20} onClick={() => handleEdit(row, dispatchModal)} />
              <Trash
                className="icon danger"
                size={20}
                onClick={() => handleDelete(row, setUpdate)}
              />
            </div>
          )
        }
      }
    ]
}

