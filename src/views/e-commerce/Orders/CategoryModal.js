import {Row, Col, Modal, Label, Input, Button, ModalBody, ModalHeader} from 'reactstrap'
import { Check, X } from 'react-feather'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import LoadingSpinner from "@components/spinner/Loading-spinner"
import { useHttp } from "@hooks/useHttp"
import { useState, useEffect } from 'react'


// ** Custom Components
import InputPreview from '@components/input-preview'

const CategoryModal = ({open, modal, handleModal, setUpdate, edit, category}) => {

  const {_id, name, order, visibility, image} = category ? category : {
    _id: null, 
    name:"", 
    order: 0, 
    visibility:true, 
    image:null}

  console.log(_id, name, order, visibility, image)

  const LabelSizeStyle = {fontSize: "1rem"}
  const [isLoading, error, sendRequest/*, clearError*/] = useHttp()
  const MySwal = withReactContent(Swal)
  const [nameValue, setNameValue] = useState(name)
  const [orderValue, setOrderValue] = useState(order)
  const [visibilityValue, setVisibilityValue] = useState(visibility)
  const [imageValue/* , setImageValue */] = useState(image)
  const [nameIsChanged, setNameIsChanged] = useState(false)
  const [orderIsChanged, setOrderIsChanged] = useState(false)
  const [visibilityIsChanged, setVisibilityIsChanged] = useState(false)
  const [imageIsChanged/* , setImageIsChanged */] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (nameValue !== "") setShowButton(true)
  }, [nameValue])
  

  const handleOnSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    if (nameIsChanged) formData.append('name', e.target.name.value)
    if (visibilityIsChanged) formData.append('visibility', e.target.visibility.checked)
    if (orderIsChanged) formData.append('order', e.target.order.value)
    if (imageIsChanged) formData.append('image', e.target.image.files[0])
    try {
      if (modal.edit) await sendRequest(
        `http://localhost:5000/api/categories/${e.target._id.value}`,
        "PATCH",
        {...formData, mode: "EDIT"}
      )
      else  await sendRequest(`http://localhost:5000/api/categories`, "POST", formData)
      setUpdate(prev => prev + Math.random())

      const result = await MySwal.fire({
        title: "Form submitted!",
        text: "hhh",
        icon: "success",
        customClass: {confirmButton: "btn btn-primary"},
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      if (result.value) handleModal()
    } catch (err) {
      console.log(err)
      console.log(error)
      MySwal.fire({
        title: "Warning!",
        text: " You clicked the button!",
        icon: "warning",
        customClass: {confirmButton: "btn btn-primary"},
        buttonsStyling: false
      })
    }
  }
  
  
  return (
      <Modal
        isOpen={open}
        toggle={handleModal}
        backdrop="static"
        keyboard={false}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={handleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'> {edit ? "Modifier " : "Ajouter"} une catégorie</h1> 
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={e => handleOnSubmit(e)}>
            <Col xs={12}>
              <Label className='form-label fw-bolder' style={LabelSizeStyle} for='name'>
                nom de la catégorie
              </Label>
              <Input 
                name='_id' 
                type='text'
                {...(category ? {defaultValue: _id} : {})}
                hidden
              />
              <Input 
                placeholder='nom de la catégorie' 
                name='name' 
                type='text'
                value={nameValue}
                onChange={(e) => { setNameValue(e.target.value); setNameIsChanged(true) }}
              />
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch w-100'>
                  <Input 
                    type='switch' 
                    name='visibility' 
                    id='visibility'
                    value={visibilityValue}
                    onChange={(e) => { setVisibilityValue(e.target.value); setVisibilityIsChanged(true) }}
                  />
                  <Label className='form-check-label' for='visibility'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                  <Label className='form-check-label fw-bolder ms-1' for='visibility'>
                    visibilité de la catégorie
                  </Label>
                </div>
              </div>
            </Col>
              <Col xs={12}>
              <Label className='form-label fw-bolder ' style={LabelSizeStyle} for='order'>
                Ordre de l'affichage
              </Label>
              <Input 
                placeholder="ordre de l'affichage" 
                name='order' 
                type='number' 
                value={orderValue}
                onChange={(e) => { setOrderValue(e.target.value); setOrderIsChanged(true) }}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label fw-bolder' style={LabelSizeStyle} for='image'>
                Image de la catégorie
              </Label>
              <InputPreview {...(category ? {imageSrc: imageValue} : {})} inputName='image'/>
            </Col>
            <Col className='text-center mt-1' xs={12}>
            { !isLoading ? <Button type='submit' disabled={!showButton} className='me-1' color='primary'>Valider</Button> : <LoadingSpinner />}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
  )
}

export default CategoryModal
