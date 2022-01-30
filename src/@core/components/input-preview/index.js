import {useState, useRef} from 'react'
import classes from './InputPreview.module.css'
import {Image} from 'react-feather'

const InputPreview = ({inputName, imageSrc, onChange}) => {

    const [hasImage, setHasImage] = useState(imageSrc)
    const inputRef = useRef()
    const previewRef = useRef()

    const fireClick = () => inputRef.current.click()

    const handleUpload = () => {
        previewRef.current.classList.remove(classes["hide"])
        const [img] = inputRef.current.files
        if (img) {
            previewRef.current.src = URL.createObjectURL(img)
            setHasImage(true)
        } 
    }

    return (
        <div className={classes['img-input']}>
            <div className={classes['img-preview']} onClick={fireClick}>
                <img 
                    className={`${!imageSrc && classes["hide"]} ${classes["preview"]}`} 
                    crossOrigin="anonymous" ref={previewRef} 
                    src={imageSrc ? imageSrc : "#"} 
                    alt="preview image"
                />
                {!hasImage &&  
                    <div className={classes['add-img']}>
                        <Image size={60}/><br/> + Ajouter une image
                    </div>
                }
            </div>
            <input 
                ref={inputRef} 
                name={inputName} 
                accept='image/*' 
                onChange={ () => { handleUpload(); onChange(previewRef.current.src) }}
                type='file' 
                hidden
            />
        </div>
    )
}
export default InputPreview