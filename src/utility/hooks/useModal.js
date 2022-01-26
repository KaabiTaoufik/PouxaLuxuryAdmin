import { useReducer } from 'react'

export const useModal = () => {
    const modalReducer = (state, action) => {
        switch (action.type) {
          case "OPEN": return {open:true}
          case "CLOSE": return {open:false}
          case "EDIT": return {open:true, edit:true, category:action.category}
        }
      }
    
    const [modal, dispatchModal] = useReducer(modalReducer, {open:false})

    return [modal, dispatchModal]
}
